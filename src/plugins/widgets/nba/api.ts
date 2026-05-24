import { startOfDay } from "date-fns";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { fetchJson } from "../../../lib";
import { API } from "../../types";
import { gameQuery as query } from "./query";
import { Game } from "./types";

function getEstString(date: Date) {
  const dateUTC = zonedTimeToUtc(
    startOfDay(date),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const dateEST = utcToZonedTime(dateUTC, "EST");
  return format(dateEST, "yyyyMMdd");
}

export async function getCurrentGames(loader: API["loader"]) {
  loader.push();
  try {
    const { data } = await fetchJson<{ data?: { schedule: Game[] } }>(
      "https://nba.rickyg.io/v1/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query(getEstString(new Date())) }),
      },
    );
    return { timestamp: Date.now(), games: data ? data.schedule : [] };
  } finally {
    loader.pop();
  }
}
