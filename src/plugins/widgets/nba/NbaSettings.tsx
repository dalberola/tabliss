import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const NbaSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="NbaSettings">
      <label>
        <input
          type="checkbox"
          checked={data.displayLogo}
          onChange={() => patch({ displayLogo: !data.displayLogo })}
        />{" "}
        <FormattedMessage {...messages.nbaDisplayLogo} />
      </label>
    </div>
  );
};

export default NbaSettings;
