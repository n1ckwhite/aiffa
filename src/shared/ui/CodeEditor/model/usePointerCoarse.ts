import { useEffect, useState } from 'react';

export const usePointerCoarse = (): boolean => {
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    try {
      const coarse =
        typeof window !== 'undefined' &&
        ((window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
          /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent));
      setIsCoarse(!!coarse);
    } catch {
      setIsCoarse(false);
    }
  }, []);
  return isCoarse;
};


