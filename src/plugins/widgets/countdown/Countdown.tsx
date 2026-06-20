import React, { FC, useContext } from "react";

import { UiContext } from "../../../contexts/ui";
import { useTime } from "../../../hooks";
import { Props, defaultData } from "./types";
import "./Countdown.sass";

const FALLBACK_MS = 365 * 24 * 60 * 60 * 1000;

function formatDiff(diff: number): string {
  if (diff <= 0) return "It is time";

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalYears = Math.floor(totalDays / 365.25);

  if (totalYears >= 1) return `in ${totalYears} ${totalYears === 1 ? "year" : "years"}`;
  if (totalDays >= 1) return `in ${totalDays} ${totalDays === 1 ? "day" : "days"}`;
  if (totalHours >= 1) return `in ${totalHours} ${totalHours === 1 ? "hour" : "hours"}`;
  if (totalMinutes >= 1) return `in ${totalMinutes} ${totalMinutes === 1 ? "minute" : "minutes"}`;
  return `in ${totalSeconds} ${totalSeconds === 1 ? "second" : "seconds"}`;
}

const Ring: FC<{ diff: number; total: number }> = ({ diff, total }) => {
  const ratio = total > 0 ? Math.max(0, Math.min(1, diff / total)) : 0;
  const fill = ratio * 100;
  const color = ratio > 2 / 3 ? "var(--color-success)" : ratio > 1 / 3 ? "var(--color-warning)" : "var(--color-danger)";

  return (
    <svg className="Countdown__ring" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
      <circle
        cx="18" cy="18" r="15.9155"
        fill="none"
        style={{ stroke: color }}
        strokeWidth="3.5"
        strokeDasharray={`${fill} 100`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
    </svg>
  );
};

const Countdown: FC<Props> = ({ data = defaultData }) => {
  const now = useTime("absolute");
  const { settings, toggleSettings } = useContext(UiContext);

  const entries = (data.entries ?? [])
    .filter((e) => e.timestamp !== null)
    .sort((a, b) => a.timestamp! - b.timestamp!);

  const openCountdownSettings = () => {
    if (!settings) toggleSettings();
    // After panel mounts, find the Countdown widget heading and expand + scroll to it
    setTimeout(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>(".Widget h4"));
      const heading = headings.find((el) => el.textContent?.trim() === "Countdown");
      if (heading) {
        heading.click();
        heading.closest<HTMLElement>(".Widget")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 200);
  };

  return (
    <div className="Countdown">
      {entries.map((entry) => {
        const diff = entry.timestamp! - now.getTime();
        const total = entry.createdAt
          ? entry.timestamp! - entry.createdAt
          : FALLBACK_MS;
        return (
          <div key={entry.id} className="Countdown__entry">
            <Ring diff={diff} total={total} />
            <div className="Countdown__text">
              <h1>{formatDiff(diff)}</h1>
              {entry.label && <h2>{entry.label}</h2>}
            </div>
          </div>
        );
      })}

      <div
        className="Countdown__entry Countdown__add"
        onClick={openCountdownSettings}
        role="button"
        tabIndex={0}
        aria-label="Add event"
      >
        <svg className="Countdown__ring" viewBox="0 0 36 36" aria-hidden="true">
          <circle
            cx="18" cy="18" r="15.9155"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeOpacity="0.35"
          />
        </svg>
        <span>+</span>
      </div>
    </div>
  );
};

export default Countdown;
