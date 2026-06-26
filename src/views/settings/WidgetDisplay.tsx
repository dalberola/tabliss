import React from "react";
import { FormattedMessage } from "react-intl";
import { WidgetDisplay as WidgetDisplayType } from "../../db/state";
import { messages } from "./messages";

type Props = {
  display: WidgetDisplayType;
  onChange: (display: Partial<WidgetDisplayType>) => void;
};

const WidgetDisplay: React.FC<Props> = ({ display, onChange }) => {
  return (
    <div className="WidgetDisplay">
      <label>
        <FormattedMessage {...messages.size} />
        <br />
        <input
          type="range"
          value={display.fontSize}
          min="2"
          max="100"
          step="2"
          onChange={(event) =>
            onChange({ fontSize: Number(event.target.value) })
          }
        />
      </label>
    </div>
  );
};

export default WidgetDisplay;
