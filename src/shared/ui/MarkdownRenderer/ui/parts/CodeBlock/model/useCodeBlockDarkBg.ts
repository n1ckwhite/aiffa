import React from 'react';

export const useCodeBlockDarkBg = (preRef: React.RefObject<HTMLElement>, fallbackIsDark: boolean) => {
  const [isDarkBg, setIsDarkBg] = React.useState<boolean>(fallbackIsDark);

  React.useEffect(() => {
    const el = preRef.current;
    if (!el) return;
    try {
      const style = window.getComputedStyle(el);
      const color = style.backgroundColor;
      const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/.exec(color || '');
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = match[4] ? parseFloat(match[4]) : 1;
        if (a === 0) {
          setIsDarkBg(fallbackIsDark);
        } else {
          const srgb = [r, g, b].map(v => {
            const c = v / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
          setIsDarkBg(luminance < 0.5);
        }
      } else {
        setIsDarkBg(fallbackIsDark);
      }
    } catch {
      setIsDarkBg(fallbackIsDark);
    }
  }, [preRef, fallbackIsDark]);

  return isDarkBg;
};


