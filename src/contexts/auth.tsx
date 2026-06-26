import React from "react";

import { exportStore, importStore } from "../db/action";
import { db, dbStorage } from "../db/state";
import { DB } from "../lib";
import { authApi, AuthError } from "../lib/authApi";

/**
 * Version of the Terms/Privacy pages presented to the user. Must match the
 * value stamped on the legal pages (target/web/terms.html, privacy.html) and
 * the auth service's CONSENT_VERSION.
 */
export const CONSENT_VERSION = "2026-06-25";

// The display email is non-sensitive and persisted so the UI can show "signed
// in as …" after a reload (the session itself is restored via the refresh
// cookie). The access token is kept in memory only — never persisted.
const EMAIL_KEY = "tabliss-auth-email";
const SYNC_DEBOUNCE_MS = 2000;

type Status = "loading" | "anon" | "authed";

interface AuthContextValue {
  status: Status;
  email: string | null;
  error: string | null;
  lastSyncedAt: number | null;
  /** Register a new account. Resolves on success (a verification email is sent). */
  register: (email: string, password: string) => Promise<void>;
  /** Log in, then pull (or adopt) the synced configuration. */
  login: (email: string, password: string) => Promise<void>;
  /** Revoke the session and stop syncing. */
  logout: () => Promise<void>;
  /** Permanently delete the account on the server, then clear the local session. */
  deleteAccount: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextValue>(null as any);

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [status, setStatus] = React.useState<Status>("loading");
  const [email, setEmail] = React.useState<string | null>(() =>
    localStorage.getItem(EMAIL_KEY),
  );
  const [error, setError] = React.useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = React.useState<number | null>(null);

  const tokenRef = React.useRef<string | null>(null);
  const authedRef = React.useRef(false);
  const importingRef = React.useRef(false);
  const unsubRef = React.useRef<null | (() => void)>(null);
  const pushTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Run an authed request, refreshing the access token once on a 401.
  const withToken = React.useCallback(
    async <T,>(fn: (token: string) => Promise<T>): Promise<T> => {
      if (!tokenRef.current) throw new Error("Not authenticated");
      try {
        return await fn(tokenRef.current);
      } catch (e) {
        if (e instanceof AuthError && e.status === 401) {
          const { accessToken } = await authApi.refresh();
          tokenRef.current = accessToken;
          return await fn(accessToken);
        }
        throw e;
      }
    },
    [],
  );

  const pushConfig = React.useCallback(async () => {
    if (!authedRef.current || importingRef.current) return;
    try {
      const dump = JSON.parse(exportStore()) as Record<string, unknown>;
      await withToken((t) => authApi.putPreferences(t, { settings: dump }));
      setLastSyncedAt(Date.now());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
    }
  }, [withToken]);

  const schedulePush = React.useCallback(() => {
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => void pushConfig(), SYNC_DEBOUNCE_MS);
  }, [pushConfig]);

  const startAutoSync = React.useCallback(() => {
    return DB.listen(db, () => {
      if (authedRef.current && !importingRef.current) schedulePush();
    });
  }, [schedulePush]);

  const enterAuthed = React.useCallback(
    (mail: string) => {
      authedRef.current = true;
      setEmail(mail || null);
      if (mail) localStorage.setItem(EMAIL_KEY, mail);
      setStatus("authed");
      if (!unsubRef.current) unsubRef.current = startAutoSync();
    },
    [startAutoSync],
  );

  const exitAuthed = React.useCallback(() => {
    authedRef.current = false;
    tokenRef.current = null;
    if (unsubRef.current) {
      unsubRef.current();
      unsubRef.current = null;
    }
    if (pushTimer.current) clearTimeout(pushTimer.current);
    setEmail(null);
    localStorage.removeItem(EMAIL_KEY);
    setStatus("anon");
  }, []);

  // On explicit login: pull the server config (server wins) or, if the server
  // has none yet, adopt the current local config.
  const syncAfterLogin = React.useCallback(async () => {
    await dbStorage.catch(() => undefined);
    try {
      const { preferences } = await withToken((t) => authApi.getPreferences(t));
      const settings = preferences.settings as
        | (Record<string, unknown> & { version?: number })
        | undefined;
      if (settings && typeof settings.version === "number") {
        importingRef.current = true;
        try {
          importStore(settings);
        } finally {
          importingRef.current = false;
        }
      } else {
        await pushConfig();
      }
      setLastSyncedAt(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
    }
  }, [withToken, pushConfig]);

  const login = React.useCallback(
    async (mail: string, password: string) => {
      setError(null);
      const addr = mail.trim().toLowerCase();
      const { accessToken } = await authApi.login(addr, password);
      tokenRef.current = accessToken;
      enterAuthed(addr);
      await syncAfterLogin();
    },
    [enterAuthed, syncAfterLogin],
  );

  const register = React.useCallback(
    async (mail: string, password: string) => {
      setError(null);
      await authApi.register(
        mail.trim().toLowerCase(),
        password,
        true,
        CONSENT_VERSION,
      );
    },
    [],
  );

  const logout = React.useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Best-effort revoke; clear the local session regardless.
    }
    exitAuthed();
  }, [exitAuthed]);

  // Permanently delete the account server-side (DELETE /me cascades the user's
  // tokens and clears the refresh cookie), then drop the local session. The
  // local dashboard config is untouched — it stays on this device.
  const deleteAccount = React.useCallback(async () => {
    setError(null);
    await withToken((t) => authApi.deleteAccount(t));
    exitAuthed();
  }, [withToken, exitAuthed]);

  // Boot: silently restore a session via the refresh cookie. We do NOT pull on
  // boot — local is authoritative between logins and auto-push keeps the server
  // in step; a pull only happens on an explicit login.
  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { accessToken } = await authApi.refresh();
        if (cancelled) return;
        tokenRef.current = accessToken;
        await dbStorage.catch(() => undefined);
        if (cancelled) return;
        enterAuthed(localStorage.getItem(EMAIL_KEY) ?? "");
      } catch {
        if (!cancelled) exitAuthed();
      }
    })();
    return () => {
      cancelled = true;
      if (unsubRef.current) unsubRef.current();
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextValue = {
    status,
    email,
    error,
    lastSyncedAt,
    register,
    login,
    logout,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => React.useContext(AuthContext);

export default AuthProvider;
