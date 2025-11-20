import React from 'react';

export const useMinWidthViewport = (minWidthPx: number): boolean => {
  const [matches, setMatches] = React.useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${minWidthPx}px)`).matches : false
  );
  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    const onChange = () => setMatches(mql.matches);
    onChange();
    try { mql.addEventListener('change', onChange); } catch { (mql as any).addListener(onChange); }
    return () => {
      try { mql.removeEventListener('change', onChange); } catch { (mql as any).removeListener(onChange); }
    };
  }, [minWidthPx]);
  return matches;
};


