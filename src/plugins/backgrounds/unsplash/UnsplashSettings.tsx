import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import { Icon } from "../../../views/shared";
import { DebounceInput } from "../../shared";
import { messages } from "../messages";
import topics from "./topics.json";
import { defaultData, Props } from "./types";

const UnsplashSettings: React.FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="UnsplashSettings">
      <label>
        <span style={{ float: "right" }}>
          {data.paused ? (
            <span className="text--grey">
              <FormattedMessage {...messages.unsplashPaused} />{" "}
            </span>
          ) : null}
          <a onClick={() => patch({ paused: !data.paused })}>
            <Icon name={data.paused ? "play" : "pause"} />
          </a>
        </span>
        <FormattedMessage {...messages.unsplashShowNewPhoto} />
        <select
          value={data.timeout}
          onChange={(event) => patch({ timeout: Number(event.target.value) })}
        >
          <option value="0">
            {intl.formatMessage(messages.unsplashEveryNewTab)}
          </option>
          <option value="300">
            {intl.formatMessage(messages.unsplashEvery5)}
          </option>
          <option value="900">
            {intl.formatMessage(messages.unsplashEvery15)}
          </option>
          <option value="3600">
            {intl.formatMessage(messages.unsplashEveryHour)}
          </option>
          <option value="86400">
            {intl.formatMessage(messages.unsplashEveryDay)}
          </option>
          <option value="604800">
            {intl.formatMessage(messages.unsplashEveryWeek)}
          </option>
        </select>
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "official"}
          onChange={() => patch({ by: "official" })}
        />{" "}
        <FormattedMessage {...messages.unsplashOfficial} />
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "topics"}
          onChange={() => patch({ by: "topics" })}
        />{" "}
        <FormattedMessage {...messages.unsplashTopic} />
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "search"}
          onChange={() => patch({ by: "search" })}
        />{" "}
        <FormattedMessage {...messages.unsplashSearch} />
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "collections"}
          onChange={() => patch({ by: "collections" })}
        />{" "}
        <FormattedMessage {...messages.unsplashCollection} />
      </label>

      {data.by === "topics" && (
        <label>
          <FormattedMessage {...messages.unsplashTopic} />
          <select
            value={data.topics}
            onChange={(event) => patch({ topics: event.target.value })}
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </label>
      )}

      {data.by === "search" && (
        <>
          <label>
            <FormattedMessage {...messages.unsplashTags} />
            <DebounceInput
              type="text"
              value={data.search}
              placeholder={intl.formatMessage(
                messages.unsplashSearchPlaceholder,
              )}
              onChange={(value) => patch({ search: value })}
              wait={500}
            />
          </label>

          <label>
            <input
              type="checkbox"
              checked={data.featured}
              onChange={() => patch({ featured: !data.featured })}
            />{" "}
            <FormattedMessage {...messages.unsplashFeatured} />
          </label>
        </>
      )}

      {data.by === "collections" && (
        <label>
          <FormattedMessage {...messages.unsplashCollection} />
          <DebounceInput
            type="text"
            value={data.collections}
            placeholder={intl.formatMessage(
              messages.unsplashCollectionPlaceholder,
            )}
            onChange={(value) => patch({ collections: value })}
            wait={500}
          />
        </label>
      )}
    </div>
  );
};

export default UnsplashSettings;
