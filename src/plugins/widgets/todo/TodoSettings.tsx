import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import { Props, defaultData } from "./types";

const TodoSettings: FC<Props> = (api) => {
  const intl = useIntl();
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="SearchSettings">
      <label>
        <FormattedMessage {...messages.todoTasksToShow} />
        <input
          type="number"
          min="0"
          onChange={(event) => patch({ show: Number(event.target.value) })}
          placeholder={intl.formatMessage(messages.todoTasksPlaceholder)}
          value={data.show}
        />
      </label>

      <label>
        <FormattedMessage {...messages.todoKeybind} />
        <input
          type="text"
          maxLength={1}
          onChange={(event) => patch({ keyBind: event.target.value })}
          value={data.keyBind}
        />
      </label>
    </div>
  );
};

export default TodoSettings;
