import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WorkHoursSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="WorkHoursSettings">
      <label>
        Start time
        <input
          type="time"
          value={data.startTime}
          onChange={(event) => patch({ startTime: event.target.value })}
        />
      </label>
      <label>
        End time
        <input
          type="time"
          value={data.endTime}
          onChange={(event) => patch({ endTime: event.target.value })}
        />
      </label>
      {daysList.map((day, index) => (
        <div key={day}>
          <label>
            <input
              type="checkbox"
              checked={data.days.includes(index)}
              onChange={(event) =>
                patch({
                  days: event.target.checked
                    ? [...data.days, index]
                    : data.days.filter((day) => day !== index),
                })
              }
            />
            {day}
          </label>
        </div>
      ))}
    </div>
  );
};

export default WorkHoursSettings;
