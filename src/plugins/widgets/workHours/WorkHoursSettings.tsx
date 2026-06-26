import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const dayMessages = [
  messages.daySunday,
  messages.dayMonday,
  messages.dayTuesday,
  messages.dayWednesday,
  messages.dayThursday,
  messages.dayFriday,
  messages.daySaturday,
];

const WorkHoursSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="WorkHoursSettings">
      <label>
        <FormattedMessage {...messages.workStartTime} />
        <input
          type="time"
          value={data.startTime}
          onChange={(event) => patch({ startTime: event.target.value })}
        />
      </label>
      <label>
        <FormattedMessage {...messages.workEndTime} />
        <input
          type="time"
          value={data.endTime}
          onChange={(event) => patch({ endTime: event.target.value })}
        />
      </label>
      {dayMessages.map((dayMessage, index) => (
        <div key={index}>
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
            <FormattedMessage {...dayMessage} />
          </label>
        </div>
      ))}
    </div>
  );
};

export default WorkHoursSettings;
