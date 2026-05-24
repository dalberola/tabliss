import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
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
        Display book and author
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.centerText}
          onChange={() => patch({ centerText: !data.centerText })}
        />{" "}
        Align text at center
      </label>
    </div>
  );
};

export default LiteratureClockSettings;
