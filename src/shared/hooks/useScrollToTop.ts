import {useCallback, useEffect, useMemo, DependencyList} from 'react';

type UseScrollToTopOptions = {
  deps?: DependencyList;
  immediate?: boolean;
};

export const useScrollToTop = (options: UseScrollToTopOptions = {}): (() => void) => {
  const { deps = [], immediate = true } = options;

  const scrollTop = useCallback(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {
      try {
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Failed to scroll to top:', error);
      }
    }
  }, []);

  const depsKey = useMemo(() => {
    try {
      return JSON.stringify(deps ?? []);
    } catch {
      return String(Array.isArray(deps) ? deps.length : 0);
    }
  }, [deps]);

  useEffect(() => {
    if (immediate) {
      scrollTop();
    }
  }, [depsKey, immediate, scrollTop]);

  return scrollTop;
};


