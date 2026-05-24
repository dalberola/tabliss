import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const GreetingSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="GreetingSettings">
      <label>
        Name
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
