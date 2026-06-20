import { fetchJson } from "../../../lib";
import { API } from "../../types";
import { Cache, Coordinates, Data } from "./types";

type Config = Pick<Data, "latitude" | "longitude" | "units">;

/** Get current forecast for a location */
export async function getForecast(
  { latitude, longitude, units }: Config,
  loader: API["loader"],
): Promise<Cache> {
  if (!latitude || !longitude) {
    return;
  }

  loader.push();
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?" +
      `latitude=${latitude}&` +
      `longitude=${longitude}&` +
      "hourly=temperature_2m&" +
      "hourly=apparent_temperature&" +
      "hourly=relativehumidity_2m&" +
      "hourly=weathercode&" +
      "timeformat=unixtime&" +
      `temperature_unit=${units === "us" ? "fahrenheit" : "celsius"}`;
    const body = await fetchJson<{
      hourly: {
        time: number[];
        temperature_2m: number[];
        apparent_temperature: number[];
        relativehumidity_2m: number[];
        weathercode: number[];
      };
    }>(url);

    // Process results
    return {
      timestamp: Date.now(),
      conditions: body.hourly.time.map((time: number, i: number) => ({
        timestamp: time * 1000, // convert to ms
        temperature: body.hourly.temperature_2m[i],
        apparentTemperature: body.hourly.apparent_temperature[i],
        humidity: body.hourly.relativehumidity_2m[i],
        weatherCode: body.hourly.weathercode[i],
      })),
    };
  } finally {
    loader.pop();
  }
}

/** Request current location from the browser */
export function requestLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          latitude: round(coords.latitude),
          longitude: round(coords.longitude),
        }),
      reject,
    ),
  );
}

export type LocationResult = {
  name: string;
  admin1?: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

/** Search for cities/locations by name, returning up to 5 results */
export async function searchLocations(
  query: string,
): Promise<LocationResult[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`;
  const data = await fetchJson<{
    results?: {
      name: string;
      admin1?: string;
      country: string;
      country_code: string;
      latitude: number;
      longitude: number;
    }[];
  }>(url);

  return (data.results ?? []).map((r) => ({
    name: r.name,
    admin1: r.admin1,
    country: r.country,
    countryCode: r.country_code,
    latitude: round(r.latitude),
    longitude: round(r.longitude),
  }));
}

function round(x: number, precision = 4): number {
  return Math.round(x * 10 ** precision) / 10 ** precision;
}
