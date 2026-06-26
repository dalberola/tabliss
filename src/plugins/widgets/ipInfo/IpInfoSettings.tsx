import React from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
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
        <FormattedMessage {...messages.ipDisplayCity} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.displayCountry}
          onChange={() => patch({ displayCountry: !data.displayCountry })}
        />
        <FormattedMessage {...messages.ipDisplayCountry} />
      </label>
    </div>
  );
};

export default IpInfoSettings;
