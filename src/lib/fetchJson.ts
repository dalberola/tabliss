/**
 * Fetch a JSON resource with consistent error handling.
 *
 * Throws on:
 * - Network failures (`fetch` rejection)
 * - Non-2xx HTTP responses (with status + a bounded preview of the body)
 *
 * Caller is responsible for shape validation of the parsed body, unless
 * `fetchJsonArray` is used, which additionally enforces `Array.isArray`.
 */
export async function fetchJson<T = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} ${res.statusText}${
        detail ? `: ${detail.slice(0, 200)}` : ""
      }`,
    );
  }
  return (await res.json()) as T;
}

/**
 * Like {@link fetchJson} but also asserts the response body is an array.
 *
 * Useful for APIs that normally return arrays but may degrade to error
 * envelopes (e.g. `{ errors: [...] }`) on auth or rate-limit failures.
 */
export async function fetchJsonArray<T = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T[]> {
  const body = await fetchJson<unknown>(input, init);
  if (!Array.isArray(body)) {
    throw new Error(
      `Expected array response, got: ${JSON.stringify(body).slice(0, 200)}`,
    );
  }
  return body as T[];
}
