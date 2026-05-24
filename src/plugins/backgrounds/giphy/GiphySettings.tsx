import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { DebounceInput } from "../../shared";
import { Props, defaultData } from "./types";

const GiphySettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="GiphySettings">
      <label>
        Tag
        <DebounceInput
          type="text"
          value={data.tag}
          onChange={(value) => patch({ tag: value })}
          wait={500}
        />
      </label>
      <p className="info">Separate multiple tags with a comma</p>

      <label>
        <input
          type="checkbox"
          checked={data.expand}
          onChange={() => patch({ expand: !data.expand })}
        />{" "}
        Stretch to fill screen
      </label>

      <label>
        <input
          type="checkbox"
          checked={!data.nsfw}
          onChange={() => patch({ nsfw: !data.nsfw })}
        />{" "}
        Safe Search
      </label>
    </div>
  );
};

export default GiphySettings;
