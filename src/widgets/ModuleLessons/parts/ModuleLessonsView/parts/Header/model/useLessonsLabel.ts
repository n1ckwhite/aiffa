import { useMemo } from 'react';

export const useLessonsLabel = (count: number): string => {
  return useMemo(() => {
    const n = count ?? 0;
    const mod10 = n % 10; const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'материал';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'материала';
    return 'материалов';
  }, [count]);
};


