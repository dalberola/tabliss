import React from "react";

import { exportStore, importStore } from "../db/action";
import { db, dbStorage } from "../db/state";
import { DB } from "../lib";
import { authApi, AuthError } from "../lib/authApi";
import { executeRecaptcha } from "../lib/recaptcha";

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
// Per-device sync clock: epoch-ms of the most recent local edit reflected in the
// config we hold. Sent on push and compared against the server's value on pull so
// the newest edit wins. Persisted so it survives a reload on the same device; 0
// means "this device has no edit of its own" (fresh login / first boot).
const UPDATED_AT_KEY = "tabliss-sync-updated-at";
const SYNC_DEBOUNCE_MS = 2000;
// A pull is coalesced when a backgrounded tab regains focus, so a long-open tab on
// one machine picks up edits made on another.
const FOCUS_PULL_DEBOUNCE_MS = 1500;

const readUpdatedAt = (): number => {
  const n = Number(localStorage.getItem(UPDATED_AT_KEY));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

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
  const focusUnsubRef = React.useRef<null | (() => void)>(null);
  const pushTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const localUpdatedAtRef = React.useRef<number>(readUpdatedAt());
  // Late-bound handle to pullAndReconcile so push (on 409), boot, and the focus
  // listener can call it without forming a useCallback dependency cycle.
  const pullRef = React.useRef<
    ((adoptIfEmpty: boolean) => Promise<void>) | null
  >(null);

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

  const setLocalUpdatedAt = React.useCallback((at: number) => {
    localUpdatedAtRef.current = at;
    if (at > 0) localStorage.setItem(UPDATED_AT_KEY, String(at));
    else localStorage.removeItem(UPDATED_AT_KEY);
  }, []);

  const pushConfig = React.useCallback(async () => {
    if (!authedRef.current || importingRef.current) return;
    try {
      const dump = JSON.parse(exportStore()) as Record<string, unknown>;
      // Stamp a clock if this device adopted a config it never edited (e.g. the
      // first push that seeds an empty account).
      const at = localUpdatedAtRef.current || Date.now();
      await withToken((t) =>
        authApi.putPreferences(t, { settings: dump, updatedAt: at }),
      );
      setLocalUpdatedAt(at);
      setLastSyncedAt(Date.now());
      setError(null);
    } catch (e) {
      if (e instanceof AuthError && e.status === 409) {
        // Another device wrote a newer config since we last synced; adopt it
        // instead of clobbering — last edit wins.
        await pullRef.current?.(false);
        return;
      }
      setError(e instanceof Error ? e.message : "Sync failed");
    }
  }, [withToken, setLocalUpdatedAt]);

  const schedulePush = React.useCallback(() => {
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => void pushConfig(), SYNC_DEBOUNCE_MS);
  }, [pushConfig]);

  const startAutoSync = React.useCallback(() => {
    return DB.listen(db, () => {
      // Genuine local edits only — import writes are guarded by importingRef, and
      // the default seed lives in a parent snapshot that never fires the listener.
      if (authedRef.current && !importingRef.current) {
        setLocalUpdatedAt(Date.now());
        schedulePush();
      }
    });
  }, [schedulePush, setLocalUpdatedAt]);

  // Re-pull when a backgrounded tab regains focus, so an open dashboard on one
  // machine reflects edits made on another without a manual re-login.
  const startFocusSync = React.useCallback(() => {
    const onActive = () => {
      if (document.visibilityState !== "visible") return;
      if (!authedRef.current || importingRef.current) return;
      if (focusTimer.current) clearTimeout(focusTimer.current);
      focusTimer.current = setTimeout(
        () => void pullRef.current?.(true),
        FOCUS_PULL_DEBOUNCE_MS,
      );
    };
    document.addEventListener("visibilitychange", onActive);
    window.addEventListener("focus", onActive);
    return () => {
      document.removeEventListener("visibilitychange", onActive);
      window.removeEventListener("focus", onActive);
      if (focusTimer.current) clearTimeout(focusTimer.current);
    };
  }, []);

  const enterAuthed = React.useCallback(
    (mail: string) => {
      authedRef.current = true;
      setEmail(mail || null);
      if (mail) localStorage.setItem(EMAIL_KEY, mail);
      setStatus("authed");
      if (!unsubRef.current) unsubRef.current = startAutoSync();
      if (!focusUnsubRef.current) focusUnsubRef.current = startFocusSync();
    },
    [startAutoSync, startFocusSync],
  );

  const exitAuthed = React.useCallback(() => {
    authedRef.current = false;
    tokenRef.current = null;
    if (unsubRef.current) {
      unsubRef.current();
      unsubRef.current = null;
    }
    if (focusUnsubRef.current) {
      focusUnsubRef.current();
      focusUnsubRef.current = null;
    }
    if (pushTimer.current) clearTimeout(pushTimer.current);
    if (focusTimer.current) clearTimeout(focusTimer.current);
    setEmail(null);
    localStorage.removeItem(EMAIL_KEY);
    // Forget this device's sync clock; the next login re-establishes it against
    // whichever account is signed in (so a different account can't be judged
    // "older" and overwritten).
    setLocalUpdatedAt(0);
    setStatus("anon");
  }, [setLocalUpdatedAt]);

  // Reconcile local and server config by edit time (newest wins). Import when the
  // server is strictly newer, or when this device has no clock of its own (fresh
  // login / first boot — defer to the account). Push when this device holds the
  // newer edit. When the server has nothing yet, seed it from this device if
  // `adoptIfEmpty`. Used by login, boot, the 409 retry, and focus regain.
  const pullAndReconcile = React.useCallback(
    async (adoptIfEmpty: boolean) => {
      await dbStorage.catch(() => undefined);
      try {
        const { preferences } = await withToken((t) =>
          authApi.getPreferences(t),
        );
        const settings = preferences.settings as
          | (Record<string, unknown> & { version?: number })
          | undefined;
        const serverAt =
          typeof preferences.updatedAt === "number" ? preferences.updatedAt : 0;
        const hasServerConfig =
          !!settings && typeof settings.version === "number";

        if (!hasServerConfig) {
          if (adoptIfEmpty) schedulePush();
          setLastSyncedAt(Date.now());
          return;
        }

        const local = localUpdatedAtRef.current;
        if (serverAt > local || local === 0) {
          importingRef.current = true;
          try {
            importStore(settings);
          } finally {
            importingRef.current = false;
          }
          setLocalUpdatedAt(serverAt || Date.now());
        } else if (local > serverAt) {
          schedulePush();
        }
        setLastSyncedAt(Date.now());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Sync failed");
      }
    },
    [withToken, schedulePush, setLocalUpdatedAt],
  );
  pullRef.current = pullAndReconcile;

  const login = React.useCallback(
    async (mail: string, password: string) => {
      setError(null);
      const addr = mail.trim().toLowerCase();
      const { accessToken } = await authApi.login(addr, password);
      tokenRef.current = accessToken;
      // An explicit login adopts the account's config: drop any device clock so
      // the server's config wins (unless the server has none yet).
      setLocalUpdatedAt(0);
      enterAuthed(addr);
      await pullAndReconcile(true);
    },
    [enterAuthed, pullAndReconcile, setLocalUpdatedAt],
  );

  const register = React.useCallback(
    async (mail: string, password: string) => {
      setError(null);
      // No-op (undefined) unless a reCAPTCHA site key is configured at build time.
      const captchaToken = await executeRecaptcha("register");
      await authApi.register(
        mail.trim().toLowerCase(),
        password,
        true,
        CONSENT_VERSION,
        captchaToken,
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

  // Boot: silently restore a session via the refresh cookie, then pull. Unlike a
  // login this keeps the device clock, so the reconcile imports only when another
  // device wrote a newer config since we last synced — otherwise the local config
  // stands and auto-push keeps the server in step. This is what makes edits made on
  // one machine reach an already-signed-in session on another.
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
        await pullRef.current?.(true);
      } catch {
        if (!cancelled) exitAuthed();
      }
    })();
    return () => {
      cancelled = true;
      if (unsubRef.current) unsubRef.current();
      if (focusUnsubRef.current) focusUnsubRef.current();
      if (pushTimer.current) clearTimeout(pushTimer.current);
      if (focusTimer.current) clearTimeout(focusTimer.current);
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
