import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const ColourSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="ColourSettings">
      <label>
        <FormattedMessage {...messages.colour} />
        <input
          type="color"
          value={data.colour}
          onChange={(event) => patch({ colour: event.target.value })}
        />
      </label>
    </div>
  );
};

export default ColourSettings;
