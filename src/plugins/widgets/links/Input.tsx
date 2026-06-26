import icons from "feather-icons/dist/icons.json";
import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  IconButton,
  RemoveIcon,
  DownIcon,
  UpIcon,
} from "../../../views/shared";
import { messages } from "../messages";
import { Link } from "./types";

type Props = Link & {
  number: number;
  onChange: (values: Partial<Link>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove: () => void;
};

const iconList = Object.keys(icons);

const Input: FC<Props> = (props) => {
  const intl = useIntl();

  return (
    <div className="LinkInput">
      <h5>
        <div className="title--buttons">
          <IconButton
            onClick={props.onRemove}
            title={intl.formatMessage(messages.linkRemove)}
          >
            <RemoveIcon />
          </IconButton>
          {props.onMoveDown && (
            <IconButton
              onClick={props.onMoveDown}
              title={intl.formatMessage(messages.linkMoveDown)}
            >
              <DownIcon />
            </IconButton>
          )}
          {props.onMoveUp && (
            <IconButton
              onClick={props.onMoveUp}
              title={intl.formatMessage(messages.linkMoveUp)}
            >
              <UpIcon />
            </IconButton>
          )}
        </div>

        {props.number <= 9
          ? intl.formatMessage(messages.linkShortcutN, {
              number: props.number,
            })
          : intl.formatMessage(messages.linkShortcut)}
      </h5>

      <label>
        <FormattedMessage {...messages.linkUrl} />
        <input
          type="url"
          value={props.url}
          onChange={(event) => props.onChange({ url: event.target.value })}
        />
      </label>

      <label>
        <FormattedMessage {...messages.name} />{" "}
        <span className="text--grey">
          <FormattedMessage {...messages.optional} />
        </span>
        <input
          type="text"
          value={props.name}
          onChange={(event) => props.onChange({ name: event.target.value })}
        />
      </label>

      <label>
        <FormattedMessage {...messages.linkIcon} />{" "}
        <span className="text--grey">
          <FormattedMessage {...messages.optional} />
        </span>
        <select
          value={props.icon}
          onChange={(event) => props.onChange({ icon: event.target.value })}
        >
          <option value={""}>
            {intl.formatMessage(messages.linkIconNone)}
          </option>
          <option value="_favicon">
            {intl.formatMessage(messages.linkIconWebsite)}
          </option>
          <optgroup label="Feather Icons">
            {iconList.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </optgroup>
        </select>
      </label>

      <hr />
    </div>
  );
};

export default Input;
