import React, { FC, useState } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const JsSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);
  const [input, setInput] = useState(data.input);
  const handleSave = () => patch({ input });

  return (
    <div className="JsSettings">
      <label>
        JavaScript Snippet
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </label>

      <button onClick={handleSave}>Apply</button>

      <p className="info">
        Warning: this functionality is intended for advanced users. Custom
        scripts may break at any time. The snippet will run once after the
        dashboard has loaded. Be careful of persisting event listeners when
        editing the snippet.
      </p>
    </div>
  );
};

export default JsSettings;
