/**
 * Client for the auth-preferences-service (https://auth.diginaut.es).
 *
 * All requests use `credentials: "include"` so the httpOnly refresh cookie
 * (set by the auth service, scoped to /auth, SameSite=Lax) flows on the
 * same-site cross-subdomain requests from diginaut.es. The short-lived access
 * token is returned in the response body and kept in memory by the caller.
 *
 * Note: only works from the configured origin (diginaut.es) — the service's CORS
 * allowlist is a single CLIENT_URL. Local dev against this API is CORS-blocked.
 */
const AUTH_API = "https://auth.diginaut.es";

export interface ServerPreferences {
  theme?: string;
  locale?: string;
  schemaVersion?: number;
  settings?: Record<string, unknown>;
}

/** A structured error carrying the service's `{ error: { code, message } }`. */
export class AuthError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${AUTH_API}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    });
  } catch {
    throw new AuthError(0, "NETWORK", "Could not reach the account service.");
  }

  const text = await res.text();
  const body: unknown = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const err = (body as { error?: { code?: string; message?: string } }).error;
    throw new AuthError(
      res.status,
      err?.code ?? "ERROR",
      err?.message ?? `Request failed (${res.status}).`,
    );
  }
  return body as T;
}

export const authApi = {
  register: (
    email: string,
    password: string,
    acceptedTerms: true,
    consentVersion: string,
    captchaToken?: string,
  ): Promise<{ message: string }> =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        acceptedTerms,
        consentVersion,
        // Omitted entirely when reCAPTCHA is not configured client-side.
        ...(captchaToken ? { captchaToken } : {}),
      }),
    }),

  login: (email: string, password: string): Promise<{ accessToken: string }> =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  refresh: (): Promise<{ accessToken: string }> =>
    request("/auth/refresh", { method: "POST" }),

  logout: (): Promise<unknown> => request("/auth/logout", { method: "POST" }),

  deleteAccount: (token: string): Promise<unknown> =>
    request("/me", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPreferences: (token: string): Promise<{ preferences: ServerPreferences }> =>
    request("/me/preferences", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),

  putPreferences: (
    token: string,
    preferences: ServerPreferences,
  ): Promise<{ preferences: ServerPreferences }> =>
    request("/me/preferences", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(preferences),
    }),
};
