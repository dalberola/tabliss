import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import TimeZoneInput from "../../../views/shared/timeZone/TimeZoneInput";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const TimeSettings: FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="TimeSettings">
      <label>
        <FormattedMessage {...messages.name} />
        <input
          type="text"
          value={data.name}
          placeholder={intl.formatMessage(messages.optionalName)}
          onChange={(event) => patch({ name: event.target.value })}
        />
      </label>

      <label>
        <FormattedMessage {...messages.timeZone} />
        <TimeZoneInput
          timeZone={data.timeZone}
          onChange={(timeZone) => patch({ timeZone })}
        />
      </label>

      <label>
        <input
          type="radio"
          checked={data.mode === "analogue"}
          onChange={() => patch({ mode: "analogue" })}
        />{" "}
        <FormattedMessage {...messages.timeAnalogue} />
      </label>

      <label>
        <input
          type="radio"
          checked={data.mode === "digital" && data.hour12}
          onChange={() => patch({ mode: "digital", hour12: true })}
        />{" "}
        <FormattedMessage {...messages.timeDigital12} />
      </label>

      <label>
        <input
          type="radio"
          checked={data.mode === "digital" && !data.hour12}
          onChange={() => patch({ mode: "digital", hour12: false })}
        />{" "}
        <FormattedMessage {...messages.timeDigital24} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.showSeconds}
          onChange={() => patch({ showSeconds: !data.showSeconds })}
        />{" "}
        <FormattedMessage {...messages.timeShowSeconds} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.showMinutes}
          onChange={() => patch({ showMinutes: !data.showMinutes })}
        />{" "}
        <FormattedMessage {...messages.timeShowMinutes} />
      </label>

      {data.mode === "digital" && data.hour12 && (
        <label>
          <input
            type="checkbox"
            checked={data.showDayPeriod}
            onChange={() => patch({ showDayPeriod: !data.showDayPeriod })}
          />{" "}
          <FormattedMessage {...messages.timeShowDayPeriod} />
        </label>
      )}

      <label>
        <input
          type="checkbox"
          checked={data.showDate}
          onChange={() => patch({ showDate: !data.showDate })}
        />{" "}
        <FormattedMessage {...messages.timeShowDate} />
      </label>
    </div>
  );
};

export default TimeSettings;
