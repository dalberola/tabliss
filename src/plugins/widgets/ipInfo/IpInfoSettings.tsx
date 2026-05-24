import React from "react";

import { usePluginData } from "../../../hooks";
import { defaultData, Props } from "./types";

const IpInfoSettings: React.FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="IpInfoSettings">
      <label>
        <input
          type="checkbox"
          checked={data.displayCity}
          onChange={() => patch({ displayCity: !data.displayCity })}
        />
        Display City
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.displayCountry}
          onChange={() => patch({ displayCountry: !data.displayCountry })}
        />
        Display Country
      </label>
    </div>
  );
};

export default IpInfoSettings;
