import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const GradientSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="GradientSettings">
      <label>
        From Colour
        <input
          type="color"
          value={data.from}
          onChange={(event) => patch({ from: event.target.value })}
        />
      </label>

      <label>
        To Colour
        <input
          type="color"
          value={data.to}
          onChange={(event) => patch({ to: event.target.value })}
        />
      </label>

      <label>
        Angle (0-360)
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
