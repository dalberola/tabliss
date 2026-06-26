import React, { FC } from "react";

import { useAuth } from "../../../contexts/auth";
import { usePluginData } from "../../../hooks";
import Icon from "../../../views/shared/icons/Icon";
import { Props, defaultData } from "./types";

/** Dashboard tile: a compact sync-status indicator. Forms live in settings. */
const Auth: FC<Props> = (api) => {
  const [data] = usePluginData(api, defaultData);
  const display = data.display ?? defaultData.display;
  const { status, email } = useAuth();

  if (display === "hidden") {
    return null;
  }

  const label =
    status === "loading"
      ? "Checking sign-in…"
      : status === "authed"
        ? `Synced${email ? ` · ${email}` : ""}`
        : "Not signed in";

  if (display === "icon") {
    const name =
      status === "loading"
        ? "loader"
        : status === "authed"
          ? "cloud"
          : "cloud-off";

    return (
      <div className="Auth Auth--icon" title={label} aria-label={label}>
        <Icon name={name} />
      </div>
    );
  }

  return (
    <div className="Auth">
      <span>{label}</span>
    </div>
  );
};

export default Auth;
