import React from "react";
import { FormattedMessage } from "react-intl";

import { usePluginData } from "../../../hooks";
import { messages } from "../messages";
import categories from "./categories";
import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);

  return (
    <div className="QuoteSettings">
      <h5>
        <FormattedMessage {...messages.quoteDaily} />
      </h5>
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
        <FormattedMessage
          {...messages.poweredBy}
          values={{
            service: (
              <a
                href="https://theysaidso.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                They Said So
              </a>
            ),
          }}
        />
      </p>
      <h5>
        <FormattedMessage {...messages.quoteHourly} />
      </h5>
      <label>
        <input
          type="radio"
          checked={data.category === "developerexcuses"}
          onChange={() => patch({ category: "developerexcuses" })}
        />{" "}
        Developer Excuses
      </label>
      <p>
        <FormattedMessage
          {...messages.poweredBy}
          values={{
            service: (
              <a
                href="http://www.developerexcuses.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developer Excuses
              </a>
            ),
          }}
        />
      </p>
    </div>
  );
};

export default QuoteSettings;
