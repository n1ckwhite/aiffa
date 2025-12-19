import { PaginationState } from "./types";

const DEFAULT_PAGE_SIZE = 4;

const normalizePage = (rawPage: unknown, totalPages: number) => {
  const n = Number(rawPage);
  const safe = Number.isFinite(n) && n > 0 ? n : 1;
  return Math.min(totalPages, Math.max(1, safe));
};

const makePageItems = (total: number, current: number) => {
  const radius = 2;
  const fullLimit = 7;
  if (total <= fullLimit) return Array.from({ length: total }, (_, i) => i + 1) as (number | string)[];
  const items: (number | string)[] = [];
  items.push(1);
  const left = Math.max(2, current - radius);
  const right = Math.min(total - 1, current + radius);
  if (left > 2) items.push('…');
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push('…');
  items.push(total);
  return items;
};

export const getPaginationState = (totalItems: number, rawPage: unknown, pageSize: number = DEFAULT_PAGE_SIZE): PaginationState => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = normalizePage(rawPage, totalPages);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pageItems = makePageItems(totalPages, page);

  return { pageSize, totalPages, page, start, end, canPrev, canNext, pageItems };
};

