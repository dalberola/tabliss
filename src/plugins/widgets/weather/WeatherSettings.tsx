import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import LocationInput from "./LocationInput";
import { defaultData, Props } from "./types";

const WeatherSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="WeatherSettings">
      <LocationInput
        latitude={data.latitude}
        longitude={data.longitude}
        onChange={(location) => patch(location)}
      />

      {data.latitude && data.latitude ? (
        <>
          <label>
            Name
            <input
              type="text"
              value={data.name || ""}
              placeholder="Optional name"
              onChange={(event) =>
                patch({ name: event.target.value || undefined })
              }
            />
          </label>

          <hr />

          <label>
            <input
              type="checkbox"
              checked={data.showDetails}
              onChange={() => patch({ showDetails: !data.showDetails })}
            />{" "}
            Show extended details
          </label>

          <label>
            <input
              type="radio"
              checked={data.units === "si"}
              onChange={() => patch({ units: "si" })}
            />{" "}
            Metric units
          </label>

          <label>
            <input
              type="radio"
              checked={data.units === "us"}
              onChange={() => patch({ units: "us" })}
            />{" "}
            Imperial units
          </label>

          <p>
            <a
              href="https://open-meteo.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Weather data by Open-Meteo.com
            </a>
          </p>
        </>
      ) : null}
    </div>
  );
};

export default WeatherSettings;
