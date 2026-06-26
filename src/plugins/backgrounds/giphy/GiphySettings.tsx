import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { DebounceInput } from "../../shared";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const GiphySettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="GiphySettings">
      <label>
        <FormattedMessage {...messages.giphyTag} />
        <DebounceInput
          type="text"
          value={data.tag}
          onChange={(value) => patch({ tag: value })}
          wait={500}
        />
      </label>
      <p className="info">
        <FormattedMessage {...messages.giphyTagHint} />
      </p>

      <label>
        <input
          type="checkbox"
          checked={data.expand}
          onChange={() => patch({ expand: !data.expand })}
        />{" "}
        <FormattedMessage {...messages.giphyStretch} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={!data.nsfw}
          onChange={() => patch({ nsfw: !data.nsfw })}
        />{" "}
        <FormattedMessage {...messages.giphySafeSearch} />
      </label>
    </div>
  );
};

export default GiphySettings;
