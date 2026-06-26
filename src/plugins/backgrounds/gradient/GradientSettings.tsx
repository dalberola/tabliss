import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const GradientSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="GradientSettings">
      <label>
        <FormattedMessage {...messages.gradientFrom} />
        <input
          type="color"
          value={data.from}
          onChange={(event) => patch({ from: event.target.value })}
        />
      </label>

      <label>
        <FormattedMessage {...messages.gradientTo} />
        <input
          type="color"
          value={data.to}
          onChange={(event) => patch({ to: event.target.value })}
        />
      </label>

      <label>
        <FormattedMessage {...messages.gradientAngle} />
        <input
          type="number"
          value={data.angle}
          onChange={(event) => patch({ angle: Number(event.target.value) })}
        />
      </label>
    </div>
  );
};

export default GradientSettings;
