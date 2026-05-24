import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
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
        Display team logo
      </label>
    </div>
  );
};

export default NbaSettings;
