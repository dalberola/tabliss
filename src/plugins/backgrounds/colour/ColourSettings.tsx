import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const ColourSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="ColourSettings">
      <label>
        Colour
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
