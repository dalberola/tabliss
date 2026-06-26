import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import { MINUTES, HOURS } from "../../../utils";
import { messages } from "../messages";
import categories from "./categories";
import { Props, defaultData, JokeAPICategory } from "./types";

function updateSelectedCategories(
  existingCategories: Set<JokeAPICategory>,
  updatedCategory: JokeAPICategory,
  checked: boolean,
): Set<JokeAPICategory> {
  const isAnyCategoryChecked = updatedCategory === "any" && checked;
  const isLastItemBeingUnchecked = !checked && existingCategories.size === 1;

  if (isLastItemBeingUnchecked) {
    return existingCategories;
  }

  if (isAnyCategoryChecked) {
    return new Set(["any"]);
  }

  const categories = new Set(existingCategories);

  categories.delete("any");

  if (checked) {
    categories.add(updatedCategory);
  } else {
    categories.delete(updatedCategory);
  }

  return categories;
}

const JokeSettings: React.FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="JokeSettings">
      <h5>
        <FormattedMessage {...messages.jokeDaily} />
      </h5>

      <label>
        <FormattedMessage {...messages.jokeShowNew} />
        <select
          value={data.timeout}
          onChange={(event) => patch({ timeout: Number(event.target.value) })}
        >
          <option value={5 * MINUTES}>
            {intl.formatMessage(messages.every5Minutes)}
          </option>
          <option value={15 * MINUTES}>
            {intl.formatMessage(messages.every15Minutes)}
          </option>
          <option value={HOURS}>
            {intl.formatMessage(messages.everyHour)}
          </option>
          <option value={24 * HOURS}>
            {intl.formatMessage(messages.everyDay)}
          </option>
          <option value={7 * 24 * HOURS}>
            {intl.formatMessage(messages.everyWeek)}
          </option>
        </select>
      </label>
      <label>
        <FormattedMessage {...messages.category} />
        {categories.map((category) => {
          return (
            <label key={category.key}>
              <input
                type="checkbox"
                checked={data.categories.has(category.key)}
                onChange={(event) => {
                  const categories = updateSelectedCategories(
                    data.categories,
                    category.key,
                    event.target.checked,
                  );

                  patch({ categories });
                }}
              />{" "}
              {category.name}
            </label>
          );
        })}
      </label>

      <p>
        <FormattedMessage
          {...messages.poweredBy}
          values={{
            service: (
              <a
                href="https://jokeapi.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                JokeAPI
              </a>
            ),
          }}
        />
      </p>
    </div>
  );
};

export default JokeSettings;
