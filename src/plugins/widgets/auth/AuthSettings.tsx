import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import "./AuthSettings.sass";
import { AuthDisplay, Props, defaultData } from "./types";

// The sign-in / account form lives in the global Settings "Account Sync"
// section (single instance). This widget only renders the dashboard status
// tile, so its settings are just how that tile is displayed.
const AuthSettings: FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);
  const display = data.display ?? defaultData.display;

  return (
    <div className="AuthSettings">
      <label className="auth-display">
        <FormattedMessage {...messages.authDashboardDisplay} />
        <select
          value={display}
          onChange={(event) =>
            patch({ display: event.target.value as AuthDisplay })
          }
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
    </div>
  );
};

export default AuthSettings;
