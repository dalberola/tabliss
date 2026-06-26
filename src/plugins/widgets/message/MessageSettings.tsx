import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const MessageSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="MessageSettings">
      <label>
        <FormattedMessage {...messages.messageLabel} />
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
