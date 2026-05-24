import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const MessageSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="MessageSettings">
      <label>
        Message
        <textarea
          rows={3}
          value={data.messages[0]}
          onChange={(event) => patch({ messages: [event.target.value] })}
        />
      </label>
    </div>
  );
};

export default MessageSettings;
