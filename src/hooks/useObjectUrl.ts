import { useEffect, useMemo, useState } from "react";

export function useObjectUrl(data?: Blob) {
  // Separating these allows clean up + eagerly calculating the first one
  const url = useMemo(() => (data ? URL.createObjectURL(data) : null), [data]);

  useEffect(() => {
    const prev = url;
    return () => {
      if (prev) URL.revokeObjectURL(prev);
    };
  }, [url]);

  return url;
}

export function useObjectUrls(data: Blob[]) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    // Capture the URLs we create here so the cleanup revokes the right
    // batch. Closing over the `urls` state directly would revoke whatever
    // was in state at the time this effect ran (typically [] on first
    // render), leaking every subsequent batch.
    const created = data.map(URL.createObjectURL);
    setUrls(created);

    return () => {
      created.forEach(URL.revokeObjectURL);
      setUrls([]);
    };
  }, [data]);

  return urls;
}
