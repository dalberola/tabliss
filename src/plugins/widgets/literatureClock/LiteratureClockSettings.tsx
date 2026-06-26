import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const LiteratureClockSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="LiteratureClockSettings">
      <label>
        <input
          type="checkbox"
          checked={data.showBookAndAuthor}
          onChange={() => patch({ showBookAndAuthor: !data.showBookAndAuthor })}
        />{" "}
        <FormattedMessage {...messages.litShowBookAuthor} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.centerText}
          onChange={() => patch({ centerText: !data.centerText })}
        />{" "}
        <FormattedMessage {...messages.litCenterText} />
      </label>
    </div>
  );
};

export default LiteratureClockSettings;
