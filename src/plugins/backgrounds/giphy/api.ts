import { fetchJson } from "../../../lib";
import { API } from "../../types";
import { Gif } from "./types";

type Config = {
  tag: string;
  nsfw: boolean;
};

type GiphyResponse = {
  data?: {
    url: string;
    images: {
      original: {
        webp: string;
      };
    };
  };
};

export async function getGif(
  { tag, nsfw }: Config,
  loader: API["loader"],
): Promise<Gif> {
  const tags = tag.split(",").map((t) => t.trim());
  const randomTag = tags[Math.floor(Math.random() * tags.length)];

  const url =
    "https://api.giphy.com/v1/gifs/random" +
    `?api_key=${GIPHY_API_KEY}` +
    "&rating=" +
    (nsfw ? "r" : "g") +
    (randomTag ? `&tag=${encodeURIComponent(randomTag)}` : "");

  loader.push();
  try {
    const res = await fetchJson<GiphyResponse>(url);

    // Empty `data` (or no matching gif) means Giphy accepted the request
    // but has nothing to return. Surface a clear error rather than
    // crashing on the subsequent property access.
    if (!res.data || !res.data.images || !res.data.images.original) {
      throw new Error(
        `Giphy API returned no image: ${JSON.stringify(res).slice(0, 200)}`,
      );
    }

    const imageRes = await fetch(res.data.images.original.webp);
    if (!imageRes.ok) {
      throw new Error(
        `Giphy image fetch failed: ${imageRes.status} ${imageRes.statusText}`,
      );
    }
    const data = await imageRes.blob();

    return {
      data,
      link: res.data.url,
    };
  } finally {
    loader.pop();
  }
}
