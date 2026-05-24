import { fetchJsonArray } from "../../../lib";
import { Quote } from "./types";

const apiEndpoint =
  "https://raw.githubusercontent.com/lbngoc/literature-clock/master/docs/times";

// Get current time code
export function getTimeCode(time: Date) {
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

// Get quote by time code
export async function getQuoteByTimeCode(timeCode: string): Promise<Quote> {
  try {
    const body = await fetchJsonArray<Quote>(`${apiEndpoint}/${timeCode}.json`, {
      mode: "cors",
    });
    return body[Math.floor(Math.random() * body.length)];
  } catch (err) {
    // Surface rate-limit errors as a polite placeholder rather than a crash;
    // any other failure re-throws into the plugin's error boundary.
    if (err instanceof Error && /\b429\b/.test(err.message)) {
      return { title: "Too many requests at this time" };
    }
    throw err;
  }
}
