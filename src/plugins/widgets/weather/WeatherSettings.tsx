import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import LocationInput from "./LocationInput";
import { defaultData, Props } from "./types";

const WeatherSettings: FC<Props> = (api) => {
  const intl = useIntl();
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
            <FormattedMessage {...messages.name} />
            <input
              type="text"
              value={data.name || ""}
              placeholder={intl.formatMessage(messages.optionalName)}
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
            <FormattedMessage {...messages.weatherShowDetails} />
          </label>

          <label>
            <input
              type="radio"
              checked={data.units === "si"}
              onChange={() => patch({ units: "si" })}
            />{" "}
            <FormattedMessage {...messages.weatherMetric} />
          </label>

          <label>
            <input
              type="radio"
              checked={data.units === "us"}
              onChange={() => patch({ units: "us" })}
            />{" "}
            <FormattedMessage {...messages.weatherImperial} />
          </label>

          <p>
            <a
              href="https://open-meteo.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FormattedMessage {...messages.weatherAttribution} />
            </a>
          </p>
        </>
      ) : null}
    </div>
  );
};

export default WeatherSettings;
