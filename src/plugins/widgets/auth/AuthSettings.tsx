import React, { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useAuth } from "../../../contexts/auth";
import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import "./AuthSettings.sass";
import { AuthDisplay, Props, defaultData } from "./types";

/** Lets the user choose how the sync status shows on the dashboard. */
const DisplaySelect: FC<{
  value: AuthDisplay;
  onChange: (value: AuthDisplay) => void;
}> = ({ value, onChange }) => {
  const intl = useIntl();

  return (
    <label className="auth-display">
      <FormattedMessage {...messages.authDashboardDisplay} />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as AuthDisplay)}
      >
        <option value="icon">
          {intl.formatMessage(messages.authDisplayIcon)}
        </option>
        <option value="full">
          {intl.formatMessage(messages.authDisplayFull)}
        </option>
        <option value="hidden">
          {intl.formatMessage(messages.authDisplayHidden)}
        </option>
      </select>
    </label>
  );
};

const AuthSettings: FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);
  const display = data.display ?? defaultData.display;
  const { status, email, error, lastSyncedAt, login, register, logout, deleteAccount } =
    useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const onDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      // On success the provider flips status to "anon" and this branch unmounts.
      await deleteAccount();
    } catch (err) {
      setDeleteError(
        err instanceof Error
          ? err.message
          : intl.formatMessage(messages.authDeleteFailed),
      );
      setDeleting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="AuthSettings">
        <FormattedMessage {...messages.authLoading} />
      </div>
    );
  }

  if (status === "authed") {
    return (
      <div className="AuthSettings">
        <p>
          {email ? (
            <FormattedMessage {...messages.authSignedInAs} values={{ email }} />
          ) : (
            <FormattedMessage {...messages.authSignedIn} />
          )}
        </p>
        {lastSyncedAt ? (
          <p>
            <small>
              <FormattedMessage
                {...messages.authLastSynced}
                values={{
                  time: new Date(lastSyncedAt).toLocaleTimeString(),
                }}
              />
            </small>
          </p>
        ) : null}
        {error ? <p role="alert">{error}</p> : null}
        <button
          type="button"
          className="button button--primary button--block"
          onClick={() => void logout()}
        >
          <FormattedMessage {...messages.authLogOut} />
        </button>

        {!confirmingDelete ? (
          <button
            type="button"
            className="button button--secondary button--block"
            onClick={() => {
              setDeleteError(null);
              setConfirmingDelete(true);
            }}
          >
            <FormattedMessage {...messages.authDeleteAccount} />
          </button>
        ) : (
          <div className="auth-danger">
            <p>
              <small>
                <FormattedMessage {...messages.authDeleteWarning} />
              </small>
            </p>
            {deleteError ? <p role="alert">{deleteError}</p> : null}
            <div className="auth-tabs">
              <button
                type="button"
                className="button button--secondary"
                disabled={deleting}
                onClick={() => setConfirmingDelete(false)}
              >
                <FormattedMessage {...messages.authCancel} />
              </button>
              <button
                type="button"
                className="button button--danger"
                disabled={deleting}
                onClick={() => void onDelete()}
              >
                {deleting ? (
                  "…"
                ) : (
                  <FormattedMessage {...messages.authConfirmDelete} />
                )}
              </button>
            </div>
          </div>
        )}

        <DisplaySelect value={display} onChange={(v) => patch({ display: v })} />
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
        setNotice(intl.formatMessage(messages.authVerifyNotice));
        setMode("login");
        setPassword("");
        setAccepted(false);
      } else {
        await login(mail, password);
      }
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : intl.formatMessage(messages.authGenericError),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="AuthSettings">
      <p>
        <small>
          <FormattedMessage {...messages.authIntro} />
        </small>
      </p>

      <div className="auth-tabs" role="tablist">
        <button
          type="button"
          className={`button ${
            mode === "login" ? "button--primary" : "button--secondary"
          }`}
          onClick={() => setMode("login")}
        >
          <FormattedMessage {...messages.authLogIn} />
        </button>
        <button
          type="button"
          className={`button ${
            mode === "register" ? "button--primary" : "button--secondary"
          }`}
          onClick={() => setMode("register")}
        >
          <FormattedMessage {...messages.authCreateAccount} />
        </button>
      </div>

      <form onSubmit={(e) => void onSubmit(e)}>
        <label>
          <FormattedMessage {...messages.authEmail} />
          <input
            type="email"
            required
            autoComplete="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          <FormattedMessage {...messages.authPassword} />
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
              <FormattedMessage
                {...messages.authAccept}
                values={{
                  terms: (chunks) => (
                    <a href="/terms.html" target="_blank" rel="noreferrer">
                      {chunks}
                    </a>
                  ),
                  privacy: (chunks) => (
                    <a href="/privacy.html" target="_blank" rel="noreferrer">
                      {chunks}
                    </a>
                  ),
                }}
              />
            </label>
            <p>
              <small>
                <FormattedMessage {...messages.authPasswordHint} />
              </small>
            </p>
          </>
        ) : null}

        <button
          type="submit"
          className="button button--primary button--block"
          disabled={busy || (mode === "register" && !accepted)}
        >
          {busy
            ? "…"
            : mode === "register"
              ? intl.formatMessage(messages.authCreateAccount)
              : intl.formatMessage(messages.authLogIn)}
        </button>
      </form>

      {notice ? <p>{notice}</p> : null}
      {formError ?? error ? <p role="alert">{formError ?? error}</p> : null}

      <DisplaySelect value={display} onChange={(v) => patch({ display: v })} />
    </div>
  );
};

export default AuthSettings;
