import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import TimeZoneInput from "../../../views/shared/timeZone/TimeZoneInput";
import { Props, defaultData } from "./types";

const TimeSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="TimeSettings">
      <label>
        Name
        <input
          type="text"
          value={data.name}
          placeholder="Optional name"
          onChange={(event) => patch({ name: event.target.value })}
        />
      </label>

      <label>
        Time Zone
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
        Analogue
      </label>

      <label>
        <input
          type="radio"
          checked={data.mode === "digital" && data.hour12}
          onChange={() => patch({ mode: "digital", hour12: true })}
        />{" "}
        12-hour digital
      </label>

      <label>
        <input
          type="radio"
          checked={data.mode === "digital" && !data.hour12}
          onChange={() => patch({ mode: "digital", hour12: false })}
        />{" "}
        24-hour digital
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.showSeconds}
          onChange={() => patch({ showSeconds: !data.showSeconds })}
        />{" "}
        Display seconds
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.showMinutes}
          onChange={() => patch({ showMinutes: !data.showMinutes })}
        />{" "}
        Display minutes
      </label>

      {data.mode === "digital" && data.hour12 && (
        <label>
          <input
            type="checkbox"
            checked={data.showDayPeriod}
            onChange={() => patch({ showDayPeriod: !data.showDayPeriod })}
          />{" "}
          Display day period
        </label>
      )}

      <label>
        <input
          type="checkbox"
          checked={data.showDate}
          onChange={() => patch({ showDate: !data.showDate })}
        />{" "}
        Display date
      </label>
    </div>
  );
};

export default TimeSettings;
