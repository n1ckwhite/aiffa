import type { QueryEntry } from "../types";

export const serializeQuery = (entries: readonly QueryEntry[]): string => {
  return entries
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      if (value === null) return encodedKey;
      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

