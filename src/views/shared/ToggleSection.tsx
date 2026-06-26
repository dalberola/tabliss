import React from "react";
import { useIntl } from "react-intl";
import { useToggle } from "../../hooks";
import { messages } from "../settings/messages";

type Props = {
  children: React.ReactNode;
  // A pre-translated section name (e.g. via `intl.formatMessage`).
  name: string;
};

const ToggleSection: React.FC<Props> = ({ name, children }) => {
  const intl = useIntl();
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <p>
        <a onClick={toggleOpen}>
          {intl.formatMessage(
            isOpen ? messages.toggleClose : messages.toggleOpen,
            { name },
          )}
        </a>
      </p>

      {isOpen && children}
    </>
  );
};

export default ToggleSection;
