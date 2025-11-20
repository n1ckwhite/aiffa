import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

export const usePagination = (totalItems: number, pageSize: number) => {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  React.useEffect(() => { setPage(1); }, [totalItems]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageWindowRadius = useBreakpointValue<number>({ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }) ?? 2;
  const fullListThreshold = useBreakpointValue<number>({ base: 5, sm: 5, md: 7, lg: 7, xl: 9 }) ?? 7;

  const makePageItems = React.useCallback((total: number, current: number, radius: number, fullLimit: number) => {
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

  const isCompactPagination = useBreakpointValue<boolean>({ base: true, sm: true, md: false }) ?? false;
  const pageItems = React.useMemo<(number | string)[]>(() => {
    if (isCompactPagination) {
      const items: (number | string)[] = [];
      const desiredCount = 4;
      let startNum = Math.max(1, page - 1);
      let endNum = Math.min(totalPages, startNum + desiredCount - 1);
      if (endNum - startNum + 1 < desiredCount) startNum = Math.max(1, endNum - desiredCount + 1);
      for (let i = startNum; i <= endNum; i++) items.push(i);
      return items;
    }
    return makePageItems(totalPages, page, pageWindowRadius, fullListThreshold);
  }, [isCompactPagination, page, totalPages, makePageItems, pageWindowRadius, fullListThreshold]);

  return { page, setPage, totalPages, start, end, canPrev, canNext, pageItems };
};


