import React from "react";

type UseMarqueeHoverPauseOptions = {
  delayMs?: number;
};

export const useMarqueeHoverPause = ({ delayMs = 160 }: UseMarqueeHoverPauseOptions = {}) => {
  const [isPaused, setIsPaused] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => setIsPaused(true), delayMs);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = null;
    setIsPaused(false);
  };

  return {
    isPaused,
    handleMouseEnter,
    handleMouseLeave,
  };
};
