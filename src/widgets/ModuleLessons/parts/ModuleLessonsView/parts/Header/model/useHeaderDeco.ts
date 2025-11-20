import { useMemo } from 'react';

export const useHeaderDeco = (level: 'beginner' | 'intermediate' | 'advanced' | string): string => {
  return useMemo(() => {
    const decoMainAlpha = 0.22;
    const decoAltAlpha = 0.16;
    const levelRgbMain =
      level === 'beginner' ? '16,185,129'
      : level === 'intermediate' ? '245,158,11'
      : '244,63,94';
    return `radial-gradient(120px 120px at 12% 22%, rgba(${levelRgbMain}, ${decoMainAlpha}), transparent 55%), radial-gradient(160px 160px at 88% 18%, rgba(${levelRgbMain}, ${decoAltAlpha}), transparent 55%)`;
  }, [level]);
};


