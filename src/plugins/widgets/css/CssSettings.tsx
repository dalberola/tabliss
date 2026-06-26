import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const CssSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="CssSettings">
      <label>
        <FormattedMessage {...messages.cssSnippet} />
        <textarea
          rows={3}
          style={{ fontFamily: "monospace" }}
          value={data.input}
          onChange={(event) => patch({ input: event.target.value })}
        />
      </label>

      <p className="info">
        <FormattedMessage {...messages.cssWarning} />
      </p>
    </div>
  );
};

export default CssSettings;
