import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData, useSavedReducer } from "../../../hooks";
import { messages } from "../messages";
import Input from "./Input";
import { addLink, removeLink, reorderLink, updateLink } from "./actions";
import { reducer } from "./reducer";
import { Link, Props, defaultData } from "./types";

const LinksSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);
  const saveLinks = (links: Link[]) => patch({ links });
  const dispatch = useSavedReducer(reducer, data.links, saveLinks);

  return (
    <div className="LinksSettings">
      <label>
        <FormattedMessage {...messages.linksColumns} />
        <input
          type="number"
          value={data.columns}
          onChange={(event) => patch({ columns: Number(event.target.value) })}
          min={1}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.visible}
          onChange={() => patch({ visible: !data.visible })}
        />
        <FormattedMessage {...messages.linksAlwaysVisible} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.linkOpenStyle}
          onChange={() => patch({ linkOpenStyle: !data.linkOpenStyle })}
        />
        <FormattedMessage {...messages.linksNewTab} />
      </label>

      <hr />

      {data.links.map((link, index) => (
        <Input
          {...link}
          key={index}
          number={index + 1}
          onChange={(values) =>
            dispatch(updateLink(index, { ...link, ...values }))
          }
          onMoveUp={
            index !== 0
              ? () => dispatch(reorderLink(index, index - 1))
              : undefined
          }
          onMoveDown={
            index !== data.links.length - 1
              ? () => dispatch(reorderLink(index, index + 1))
              : undefined
          }
          onRemove={() => dispatch(removeLink(index))}
        />
      ))}

      <p style={{ marginTop: "0.5rem" }}>
        <button
          className="button button--primary"
          onClick={() => dispatch(addLink())}
        >
          <FormattedMessage {...messages.linksAdd} />
        </button>
      </p>
    </div>
  );
};

export default LinksSettings;
