export type GetCompactPagesArgs = {
  /** Current page */
  page: number;
  /** Max page number */
  lastPage: number;
  /** How many page buttons to show */
  limit: number;
};

/**
 * Builds a compact set of page numbers:
 * - Always includes: 1, middle, last
 * - Also includes current neighbors
 * - Fills remaining slots with nearest pages to current
 */
export const getCompactPages = ({ page, lastPage, limit }: GetCompactPagesArgs): number[] => {
  if (!Number.isFinite(lastPage) || lastPage <= 0) return [Math.max(1, page)];

  const safeLimit = Math.max(1, Math.floor(limit || 0));
  const safePage = Math.max(1, Math.min(lastPage, Math.floor(page || 1)));

  if (lastPage <= safeLimit) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const mid = Math.max(1, Math.min(lastPage, Math.ceil(lastPage / 2)));
  const required = Array.from(new Set([1, mid, lastPage]));

  const isInMiddleRange = (p: number) => p > 1 && p < lastPage;
  const addUnique = (arr: number[], value: number) => {
    if (!Number.isFinite(value)) return;
    if (value < 1 || value > lastPage) return;
    if (arr.includes(value)) return;
    arr.push(value);
  };

  // Start with required pages (start/middle/end), then add current neighborhood.
  const acc: number[] = [...required];
  [safePage - 1, safePage, safePage + 1].filter(isInMiddleRange).forEach((p) => addUnique(acc, p));

  // Fill up to `limit` with pages around current page.
  for (let offset = 2; acc.length < safeLimit && offset <= lastPage; offset += 1) {
    addUnique(acc, safePage - offset);
    if (acc.length >= safeLimit) break;
    addUnique(acc, safePage + offset);
  }

  // Final fallback: fill from the beginning (excluding first/last).
  for (let p = 2; acc.length < safeLimit && p <= lastPage - 1; p += 1) {
    addUnique(acc, p);
  }

  // If somehow we got more than `limit`, keep start/middle/end and nearest pages to current.
  const unique = Array.from(new Set(acc));
  if (unique.length <= safeLimit) return unique.sort((a, b) => a - b);

  const requiredSet = new Set(required);
  const others = unique
    .filter((p) => !requiredSet.has(p))
    .sort((a, b) => Math.abs(a - safePage) - Math.abs(b - safePage));
  const limited = [...required, ...others.slice(0, Math.max(0, safeLimit - required.length))];
  return Array.from(new Set(limited)).sort((a, b) => a - b);
};


