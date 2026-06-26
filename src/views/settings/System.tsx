import React from "react";
import { FormattedMessage } from "react-intl";
import { db } from "../../db/state";
import { useKey } from "../../lib/db/react";
import { localeOptions } from "../../locales";
import TimeZoneInput from "../shared/timeZone/TimeZoneInput";
import { messages } from "./messages";

const System: React.FC = () => {
  const [locale, setLocale] = useKey(db, "locale");
  const [timeZone, setTimeZone] = useKey(db, "timeZone");
  const [sidebarOpacity, setSidebarOpacity] = useKey(db, "sidebarOpacity");

  return (
    <div>
      <h2>
        <FormattedMessage
          id="settings"
          defaultMessage="Settings"
          description="Settings title"
        />
      </h2>

      <label
        style={{
          alignItems: "center",
          display: "grid",
          gridGap: "0 0.5rem",
          gridTemplateColumns: "1fr 2fr",
          width: "100%",
          margin: 0,
        }}
      >
        <span>
          <FormattedMessage {...messages.language} />
        </span>
        <select
          value={locale}
          onChange={(event) => setLocale(event.target.value)}
        >
          {localeOptions.map(({ code, label, name }) => (
            <option key={code} value={code} title={name}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label
        style={{
          alignItems: "center",
          display: "grid",
          gridGap: "0 0.5rem",
          gridTemplateColumns: "1fr 2fr",
          width: "100%",
          margin: 0,
        }}
      >
        <FormattedMessage {...messages.timeZone} />
        <TimeZoneInput timeZone={timeZone} onChange={setTimeZone} />
      </label>

      <label style={{ display: "block", margin: "0.75rem 0 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.1rem",
          }}
        >
          <span>
            <FormattedMessage {...messages.opacity} />
          </span>
          <span style={{ opacity: 0.6, fontSize: "0.9em" }}>
            {Math.round((sidebarOpacity ?? 0.92) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0.4}
          max={1}
          step={0.05}
          value={sidebarOpacity ?? 0.92}
          onChange={(e) => setSidebarOpacity(parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
};

export default System;
