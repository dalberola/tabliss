import { fetchJson } from "../../../lib";
import { API } from "../../types";
import { IpData } from "./types";

export async function getIpInfo(loader: API["loader"]): Promise<IpData> {
  loader.push();

  try {
    const data = await fetchJson<IpData>("https://ipwho.is/");
    return {
      ip: data.ip,
      city: data.city,
      country: data.country,
    };
  } finally {
    loader.pop();
  }
}
