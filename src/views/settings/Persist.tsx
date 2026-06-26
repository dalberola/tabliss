import React from "react";
import { FormattedMessage } from "react-intl";
import { messages } from "./messages";

const Persist: React.FC = () => {
  const [error, setError] = React.useState(false);
  const [persisted, setPersisted] = React.useState(true); // Hide until we know otherwise

  React.useEffect(() => {
    if (navigator.storage) navigator.storage.persisted().then(setPersisted);
  }, []);

  if (persisted) return null;

  const handleClick = () => {
    navigator.storage
      .persist()
      .then((persisted) =>
        persisted ? setPersisted(persisted) : setError(true),
      );
  };

  return (
    <div className="Widget" style={{ textAlign: "center" }}>
      <h4>
        <FormattedMessage {...messages.persistTitle} />
      </h4>
      <p>
        <FormattedMessage {...messages.persistPrompt} />
      </p>
      {error ? (
        <p>
          <FormattedMessage {...messages.persistError} />
        </p>
      ) : (
        <button className="button button--primary" onClick={handleClick}>
          <FormattedMessage {...messages.persistTitle} />
        </button>
      )}
    </div>
  );
};

export default Persist;
