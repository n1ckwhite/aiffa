export const safeTrim = (v: unknown): string => {
  if (typeof v !== "string") return "";
  return v.trim();
};

export const safeNonNegativeInt = (v: unknown): number => {
  if (typeof v !== "number") return 0;
  if (!Number.isFinite(v)) return 0;
  if (v < 0) return 0;
  return Math.trunc(v);
};

