import React, { FC } from "react";

import { usePluginData } from "../../../hooks";
import { IconButton, RemoveIcon } from "../../../views/shared";
import { Entry, Props, defaultData } from "./types";
import "./Countdown.sass";

const pad = (n: number) => String(n).padStart(2, "0");

function getDateStr(ts: number | null): string {
  if (ts === null) return "";
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function applyDate(ts: number | null, dateStr: string): number | null {
  if (!dateStr) return null;
  const [y, mo, day] = dateStr.split("-").map(Number);
  const prev = ts !== null ? new Date(ts) : null;
  return new Date(y, mo - 1, day, prev ? prev.getHours() : 0, prev ? prev.getMinutes() : 0, 0).getTime();
}

function applyHours(ts: number, val: string): number {
  const h = Math.max(0, Math.min(23, parseInt(val) || 0));
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, d.getMinutes(), 0).getTime();
}

function applyMinutes(ts: number, val: string): number {
  const m = Math.max(0, Math.min(59, parseInt(val) || 0));
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), m, 0).getTime();
}

const CountdownSettings: FC<Props> = (api) => {
  const [data, patch] = usePluginData(api, defaultData);
  const entries = data.entries ?? [];

  const addEntry = () => {
    patch({
      entries: [
        ...entries,
        { id: crypto.randomUUID(), label: "", timestamp: null, createdAt: Date.now() },
      ],
    });
  };

  const removeEntry = (id: string) => {
    patch({ entries: entries.filter((e) => e.id !== id) });
  };

  const updateEntry = (id: string, partial: Partial<Entry>) => {
    patch({ entries: entries.map((e) => (e.id === id ? { ...e, ...partial } : e)) });
  };

  return (
    <div>
      {[...entries]
        .sort((a, b) => {
          if (a.timestamp === null) return 1;
          if (b.timestamp === null) return -1;
          return a.timestamp - b.timestamp;
        })
        .map((entry) => {
        const d = entry.timestamp !== null ? new Date(entry.timestamp) : null;

        return (
          <div key={entry.id} className="Countdown__item">
            <div className="Countdown__item-header">
              <input
                type="text"
                value={entry.label}
                placeholder="Event name"
                onChange={(e) => updateEntry(entry.id, { label: e.target.value })}
              />
              <IconButton onClick={() => removeEntry(entry.id)} title="Remove event">
                <RemoveIcon />
              </IconButton>
            </div>
            <input
              type="date"
              value={getDateStr(entry.timestamp)}
              onChange={(e) =>
                updateEntry(entry.id, { timestamp: applyDate(entry.timestamp, e.target.value) })
              }
            />
            <div className="Countdown__time">
              <input
                type="number"
                min={0}
                max={23}
                placeholder="HH"
                disabled={d === null}
                value={d ? pad(d.getHours()) : ""}
                onChange={(e) =>
                  d && updateEntry(entry.id, { timestamp: applyHours(entry.timestamp!, e.target.value) })
                }
              />
              <span>:</span>
              <input
                type="number"
                min={0}
                max={59}
                placeholder="MM"
                disabled={d === null}
                value={d ? pad(d.getMinutes()) : ""}
                onChange={(e) =>
                  d && updateEntry(entry.id, { timestamp: applyMinutes(entry.timestamp!, e.target.value) })
                }
              />
            </div>
          </div>
        );
      })}

      <p style={{ marginTop: "0.5rem" }}>
        <button className="button button--primary" onClick={addEntry}>
          Add event
        </button>
      </p>
    </div>
  );
};

export default CountdownSettings;
