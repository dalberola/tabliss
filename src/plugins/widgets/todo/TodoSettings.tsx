import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { Props, defaultData } from "./types";

const TodoSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="SearchSettings">
      <label>
        Tasks to show
        <input
          type="number"
          min="0"
          onChange={(event) => patch({ show: Number(event.target.value) })}
          placeholder="Number of todo items to show"
          value={data.show}
        />
      </label>

      <label>
        New task keybind
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
