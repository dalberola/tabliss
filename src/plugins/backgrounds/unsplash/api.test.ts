// @ts-nocheck
(global as any).UNSPLASH_API_KEY = "test-key";

import { calculateWidth, fetchImages } from "./api";

describe("unsplash/api", () => {
  it("should calculate width for screen", () => {
    expect(calculateWidth()).toBe(1920);
    expect(calculateWidth(1920)).toBe(1920);
    expect(calculateWidth(2000)).toBe(2160);
    expect(calculateWidth(5000)).toBe(3840);
  });

  it("should consider pixel ratio", () => {
    expect(calculateWidth(1000, 2)).toBe(2160);
  });

  describe("fetchImages error handling", () => {
    const originalFetch = global.fetch;
    afterEach(() => {
      global.fetch = originalFetch;
    });

    it("throws a readable error on non-OK responses", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        text: () => Promise.resolve('{"errors":["OAuth error: Invalid token"]}'),
      });

      await expect(fetchImages({ by: "official" } as any)).rejects.toThrow(
        /HTTP 401 Unauthorized/,
      );
    });

    it("throws when the body is not an array (e.g. error envelope on 200)", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve({ errors: ["Rate Limit Exceeded"] }),
      });

      await expect(fetchImages({ by: "official" } as any)).rejects.toThrow(
        /Expected array response/,
      );
    });
  });
});
