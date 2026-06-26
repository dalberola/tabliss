import React, { FC, useState } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const JsSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);
  const [input, setInput] = useState(data.input);
  const handleSave = () => patch({ input });

  return (
    <div className="JsSettings">
      <label>
        <FormattedMessage {...messages.jsSnippet} />
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </label>

      <button onClick={handleSave}>
        <FormattedMessage {...messages.jsApply} />
      </button>

      <p className="info">
        <FormattedMessage {...messages.jsWarning} />
      </p>
    </div>
  );
};

export default JsSettings;
