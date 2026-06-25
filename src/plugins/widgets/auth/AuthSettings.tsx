import React, { FC, useState } from "react";

import { useAuth } from "../../../contexts/auth";
import "./AuthSettings.sass";

const AuthSettings: FC = () => {
  const { status, email, error, lastSyncedAt, login, register, logout } =
    useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (status === "loading") {
    return <div className="AuthSettings">Loading…</div>;
  }

  if (status === "authed") {
    return (
      <div className="AuthSettings">
        <p>
          Signed in{email ? ` as ${email}` : ""}. Your settings sync
          automatically across devices.
        </p>
        {lastSyncedAt ? (
          <p>
            <small>
              Last synced {new Date(lastSyncedAt).toLocaleTimeString()}
            </small>
          </p>
        ) : null}
        {error ? <p role="alert">{error}</p> : null}
        <button
          type="button"
          className="button button--primary button--block"
          onClick={() => void logout()}
        >
          Log out
        </button>
      </div>
    );
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setFormError(null);
    setNotice(null);
    try {
      if (mode === "register") {
        await register(mail, password);
        setNotice("Check your email to verify your account, then log in.");
        setMode("login");
        setPassword("");
        setAccepted(false);
      } else {
        await login(mail, password);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="AuthSettings">
      <p>
        <small>Sign in to save your dashboard and sync it across devices.</small>
      </p>

      <div className="auth-tabs" role="tablist">
        <button
          type="button"
          className={`button ${
            mode === "login" ? "button--primary" : "button--secondary"
          }`}
          onClick={() => setMode("login")}
        >
          Log in
        </button>
        <button
          type="button"
          className={`button ${
            mode === "register" ? "button--primary" : "button--secondary"
          }`}
          onClick={() => setMode("register")}
        >
          Create account
        </button>
      </div>

      <form onSubmit={(e) => void onSubmit(e)}>
        <label>
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={mode === "register" ? 12 : 1}
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {mode === "register" ? (
          <>
            <label>
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />{" "}
              I accept the{" "}
              <a href="/terms.html" target="_blank" rel="noreferrer">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy.html" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
            </label>
            <p>
              <small>Password must be at least 12 characters.</small>
            </p>
          </>
        ) : null}

        <button
          type="submit"
          className="button button--primary button--block"
          disabled={busy || (mode === "register" && !accepted)}
        >
          {busy ? "…" : mode === "register" ? "Create account" : "Log in"}
        </button>
      </form>

      {notice ? <p>{notice}</p> : null}
      {formError ?? error ? <p role="alert">{formError ?? error}</p> : null}
    </div>
  );
};

export default AuthSettings;
