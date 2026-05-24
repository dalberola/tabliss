import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import categories from "./categories";
import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="QuoteSettings">
      <h5>Daily Quotes</h5>
      {categories.map((category) => (
        <label key={category.key}>
          <input
            type="radio"
            checked={data.category === category.key}
            onChange={() => patch({ category: category.key })}
          />{" "}
          {category.name}
        </label>
      ))}
      <p>
        Powered by{" "}
        <a
          href="https://theysaidso.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          They Said So
        </a>
      </p>
      <h5>Hourly Quotes</h5>
      <label>
        <input
          type="radio"
          checked={data.category === "developerexcuses"}
          onChange={() => patch({ category: "developerexcuses" })}
        />{" "}
        Developer Excuses
      </label>
      <p>
        Powered by{" "}
        <a
          href="http://www.developerexcuses.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developer Excuses
        </a>
      </p>
    </div>
  );
};

export default QuoteSettings;
