import React from "react";

import { usePluginData } from "../../../hooks";
import { Icon } from "../../../views/shared";
import { DebounceInput } from "../../shared";
import topics from "./topics.json";
import { defaultData, Props } from "./types";

const UnsplashSettings: React.FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="UnsplashSettings">
      <label>
        <span style={{ float: "right" }}>
          {data.paused ? <span className="text--grey">(Paused) </span> : null}
          <a onClick={() => patch({ paused: !data.paused })}>
            <Icon name={data.paused ? "play" : "pause"} />
          </a>
        </span>
        Show a new photo
        <select
          value={data.timeout}
          onChange={(event) => patch({ timeout: Number(event.target.value) })}
        >
          <option value="0">Every new tab</option>
          <option value="300">Every 5 minutes</option>
          <option value="900">Every 15 minutes</option>
          <option value="3600">Every hour</option>
          <option value="86400">Every day</option>
          <option value="604800">Every week</option>
        </select>
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "official"}
          onChange={() => patch({ by: "official" })}
        />{" "}
        Official Collection
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "topics"}
          onChange={() => patch({ by: "topics" })}
        />{" "}
        Topic
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "search"}
          onChange={() => patch({ by: "search" })}
        />{" "}
        Search
      </label>

      <label>
        <input
          type="radio"
          checked={data.by === "collections"}
          onChange={() => patch({ by: "collections" })}
        />{" "}
        Collection
      </label>

      {data.by === "topics" && (
        <label>
          Topic
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
            Tags
            <DebounceInput
              type="text"
              value={data.search}
              placeholder="Try landscapes or animals..."
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
            Only featured images
          </label>
        </>
      )}

      {data.by === "collections" && (
        <label>
          Collection
          <DebounceInput
            type="text"
            value={data.collections}
            placeholder="Collection ID number"
            onChange={(value) => patch({ collections: value })}
            wait={500}
          />
        </label>
      )}
    </div>
  );
};

export default UnsplashSettings;
