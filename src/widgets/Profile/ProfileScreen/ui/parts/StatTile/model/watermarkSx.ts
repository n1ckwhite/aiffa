export const buildWatermarkSx = (watermarkColor: string) => {
  return {
    "& .stat-tile-watermark": {
      transition: "transform 180ms ease, opacity 180ms ease, color 180ms ease",
    },
    "&:hover .stat-tile-watermark": {
      transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
      opacity: 0.12,
      color: watermarkColor,
    },
    "&:focus-visible .stat-tile-watermark": {
      transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
      opacity: 0.12,
      color: watermarkColor,
    },
  } as const;
};


