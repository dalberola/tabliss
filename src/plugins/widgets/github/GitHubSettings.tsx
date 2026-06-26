import React from "react";
import { FormattedMessage } from "react-intl";
import { DebounceInput } from "../../shared";
import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { defaultData, Props } from "./types";

const GitHubSettings: React.FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="MessageSettings">
      <label>
        <FormattedMessage {...messages.githubUsername} />
        <DebounceInput
          type="text"
          value={data.username}
          onChange={(username) => patch({ username })}
        />
      </label>
      {/* <label>
        <input
          type="checkbox"
          checked={data.showSummary}
          onChange={(event) =>
            patch({ showSummary: !data.showSummary })
          }
        />{" "}
        Show summary overview
      </label>*/}
    </div>
  );
};

export default GitHubSettings;
