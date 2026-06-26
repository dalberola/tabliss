import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const GreetingSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="GreetingSettings">
      <label>
        <FormattedMessage {...messages.name} />
        <input
          type="text"
          value={data.name}
          onChange={(event) => patch({ name: event.target.value })}
        />
      </label>
    </div>
  );
};

export default GreetingSettings;
