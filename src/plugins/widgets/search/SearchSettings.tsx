import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { engines } from "./engines";
import { Props, defaultData } from "./types";

const SearchSettings: FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="SearchSettings">
      <label>
        <FormattedMessage {...messages.searchProvider} />
        <select
          onChange={(event) => patch({ searchEngine: event.target.value })}
          value={data.searchEngine}
        >
          {engines.map(({ key, name }) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </label>

      {BUILD_TARGET === "web" && (
        <label>
          <FormattedMessage {...messages.searchSuggestionsProvider} />
          <select
            onChange={(event) =>
              patch({ suggestionsEngine: event.target.value })
            }
            value={data.suggestionsEngine}
          >
            <option key="off" value="">
              {intl.formatMessage(messages.searchOff)}
            </option>
            {engines
              .filter(({ suggest_url }) => Boolean(suggest_url))
              .map(({ key, name }) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
          </select>
        </label>
      )}

      {data.suggestionsEngine && (
        <label>
          <FormattedMessage {...messages.searchSuggestionQuantity} />
          <input
            type="number"
            min="1"
            max="10"
            value={data.suggestionsQuantity}
            onChange={(event) =>
              patch({ suggestionsQuantity: Number(event.target.value) })
            }
          />
        </label>
      )}
    </div>
  );
};

export default SearchSettings;
