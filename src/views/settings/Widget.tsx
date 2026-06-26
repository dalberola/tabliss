import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { setWidgetDisplay } from "../../db/action";
import { WidgetState } from "../../db/state";
import { useToggle } from "../../hooks";
import { getConfig } from "../../plugins";
import { DownIcon, Icon, IconButton, RemoveIcon, UpIcon } from "../shared";
import PluginContainer from "../shared/Plugin";
import ToggleSection from "../shared/ToggleSection";
import "./Widget.sass";
import WidgetDisplay from "./WidgetDisplay";
import { messages } from "./messages";

function hexToRgba(colour: string | undefined): { hex: string; alpha: number } {
  if (!colour) return { hex: "#ffffff", alpha: 1 };
  const rgba = colour.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/,
  );
  if (rgba) {
    const hex =
      "#" +
      [rgba[1], rgba[2], rgba[3]]
        .map((v) => parseInt(v).toString(16).padStart(2, "0"))
        .join("");
    return { hex, alpha: rgba[4] !== undefined ? parseFloat(rgba[4]) : 1 };
  }
  return { hex: colour.startsWith("#") ? colour : "#ffffff", alpha: 1 };
}

function buildColour(hex: string, alpha: number): string {
  if (alpha === 1) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface Props {
  plugin: WidgetState;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
}

const Widget: React.FC<Props> = ({
  plugin,
  onMoveDown,
  onMoveUp,
  onRemove,
}) => {
  const intl = useIntl();
  const [isOpen, toggleIsOpen] = useToggle(onRemove === undefined);

  const { description, name, settingsComponent } = getConfig(plugin.key);

  const setDisplay = setWidgetDisplay.bind(null, plugin.id);
  const { hex: colourHex, alpha: colourAlpha } = hexToRgba(plugin.display.colour);

  return (
    <fieldset className="Widget">
      <div className="title--buttons">
        <IconButton
          onClick={onRemove}
          title={intl.formatMessage(messages.removeWidget)}
        >
          <RemoveIcon />
        </IconButton>

        <IconButton
          onClick={toggleIsOpen}
          title={intl.formatMessage(
            isOpen ? messages.closeWidgetSettings : messages.editWidgetSettings,
          )}
        >
          <Icon name="settings" />
        </IconButton>

        {onMoveDown && (
          <IconButton
            onClick={onMoveDown}
            title={intl.formatMessage(messages.moveWidgetDown)}
          >
            <DownIcon />
          </IconButton>
        )}

        {onMoveUp && (
          <IconButton
            onClick={onMoveUp}
            title={intl.formatMessage(messages.moveWidgetUp)}
          >
            <UpIcon />
          </IconButton>
        )}

        <h4 onClick={toggleIsOpen}>{name}</h4>
        {!isOpen && <p>{description}</p>}
      </div>

      {isOpen && (
        <div>
          {settingsComponent && (
            <div className="settings">
              <PluginContainer id={plugin.id} component={settingsComponent} />
            </div>
          )}

          <ToggleSection name={intl.formatMessage(messages.displaySettings)}>
            <WidgetDisplay display={plugin.display} onChange={setDisplay} />
          </ToggleSection>

          <ToggleSection name={intl.formatMessage(messages.fontSettings)}>
            <>
              <label>
                <FormattedMessage {...messages.font} />
                <select
                  value={plugin.display.fontFamily ?? ""}
                  onChange={(event) =>
                    setDisplay({
                      fontFamily: event.target.value || undefined,
                    })
                  }
                >
                  <option value="">
                    {intl.formatMessage(messages.fontDefault)}
                  </option>
                  <optgroup label="Sans-serif">
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Gill Sans">Gill Sans</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="-apple-system">System (Apple)</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Ubuntu">Ubuntu</option>
                  </optgroup>
                  <optgroup label="Serif">
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Palatino">Palatino</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Cambria">Cambria</option>
                  </optgroup>
                  <optgroup label="Monospace">
                    <option value="Courier New">Courier New</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Menlo">Menlo</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Lucida Console">Lucida Console</option>
                  </optgroup>
                </select>
              </label>

              <label>
                <FormattedMessage {...messages.weight} />
                <select
                  value={plugin.display.fontWeight}
                  onChange={(event) =>
                    setDisplay({
                      fontWeight: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    })
                  }
                >
                  <option value="">
                    {intl.formatMessage(messages.fontDefault)}
                  </option>
                  <option value="100">
                    {intl.formatMessage(messages.weightThin)}
                  </option>
                  <option value="300">
                    {intl.formatMessage(messages.weightLight)}
                  </option>
                  <option value="400">
                    {intl.formatMessage(messages.weightRegular)}
                  </option>
                  <option value="500">
                    {intl.formatMessage(messages.weightMedium)}
                  </option>
                  <option value="700">
                    {intl.formatMessage(messages.weightBold)}
                  </option>
                  <option value="900">
                    {intl.formatMessage(messages.weightBlack)}
                  </option>
                </select>
              </label>

              <label>
                <FormattedMessage {...messages.colour} />
                <input
                  type="color"
                  value={colourHex}
                  onChange={(event) =>
                    setDisplay({
                      colour: buildColour(event.target.value, colourAlpha),
                    })
                  }
                />
              </label>

              <label>
                <FormattedMessage {...messages.opacity} />{" "}
                {Math.round(colourAlpha * 100)}%
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={colourAlpha}
                  onChange={(event) =>
                    setDisplay({
                      colour: buildColour(
                        colourHex,
                        parseFloat(event.target.value),
                      ),
                    })
                  }
                />
              </label>
            </>
          </ToggleSection>
        </div>
      )}
    </fieldset>
  );
};

export default Widget;
