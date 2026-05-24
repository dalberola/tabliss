import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const CssSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="CssSettings">
      <label>
        CSS Snippet
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={data.input}
          onChange={(event) => patch({ input: event.target.value })}
        />
      </label>

      <p className="info">
        Warning: this functionality is intended for advanced users. Custom styles
        may break at any time.
      </p>
    </div>
  );
};

export default CssSettings;
