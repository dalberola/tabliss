import React, { FC } from "react";

import { usePluginData, useSavedReducer } from "../../../hooks";
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
        Number of columns
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
        Links are always visible
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.linkOpenStyle}
          onChange={() => patch({ linkOpenStyle: !data.linkOpenStyle })}
        />
        Links open in a new tab
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
          Add link
        </button>
      </p>
    </div>
  );
};

export default LinksSettings;
