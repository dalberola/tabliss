import React, { FC } from "react";

import { useAuth } from "../../../contexts/auth";

/** Dashboard tile: a compact sync-status indicator. Forms live in settings. */
const Auth: FC = () => {
  const { status, email } = useAuth();

  return (
    <div className="Auth">
      {status === "loading" ? (
        <span>…</span>
      ) : status === "authed" ? (
        <span>Synced{email ? ` · ${email}` : ""}</span>
      ) : (
        <span>Not signed in</span>
      )}
    </div>
  );
};

export default Auth;
