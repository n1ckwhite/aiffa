import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePagination = (totalItems: number, pageSize: number, resetKey?: string) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  useEffect(() => { setPage(1); }, [resetKey]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const makePageItems = useCallback((total: number, current: number, radius: number, fullLimit: number) => {
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
  }, []);

  const pageItems = useMemo<(number | string)[]>(() => {
    return makePageItems(totalPages, page, 2, 7);
  }, [makePageItems, page, totalPages]);

  return { page, setPage, totalPages, canPrev, canNext, start, end, pageItems };
};


