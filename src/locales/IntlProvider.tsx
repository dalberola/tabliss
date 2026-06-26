import React, { useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { db } from "../db/state";
import { useValue } from "../lib/db/react";
import { loadMessages, peekMessages } from "./locales";

type Resolved = { locale: string; messages: Record<string, string> };

const IntlProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const locale = useValue(db, "locale");

  // Seed from cache when the catalogue is already known (English or a locale
  // visited earlier) so the first paint isn't a flash of source strings.
  const [resolved, setResolved] = useState<Resolved>(() => ({
    locale,
    messages: peekMessages(locale) ?? {},
  }));

  useEffect(() => {
    let cancelled = false;
    void loadMessages(locale).then((messages) => {
      if (!cancelled) setResolved({ locale, messages });
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Render the last fully-resolved (locale, messages) pair so the locale and
  // its catalogue always agree, and switching languages keeps the current one
  // visible until the next catalogue arrives instead of flashing English.
  return (
    <ReactIntlProvider locale={resolved.locale} messages={resolved.messages}>
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
