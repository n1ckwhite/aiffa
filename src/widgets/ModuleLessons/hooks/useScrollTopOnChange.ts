import { useScrollToTop } from 'shared/hooks/useScrollToTop';

export const useScrollTopOnChange = (deps: React.DependencyList) => {
  useScrollToTop({ deps, immediate: true });
};


