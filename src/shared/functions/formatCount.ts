export const formatCount = (value?: number | null): string => {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";

  const isNegative = value < 0;
  let abs = Math.abs(value);

  if (abs < 1000) return String(value);

  const suffixes = ["", "к", "кк", "ккк", "кккк"] as const;
  let unit = 0;

  while (abs >= 1000 && unit < suffixes.length - 1) {
    abs /= 1000;
    unit += 1;
  }

  const decimals = abs >= 10 ? 0 : 1;
  let rounded = Number(abs.toFixed(decimals));

  // Handle rounding up (e.g. 999.9k -> 1кк)
  if (rounded >= 1000 && unit < suffixes.length - 1) {
    rounded = 1;
    unit += 1;
  }

  let formatted = rounded.toFixed(decimals);
  if (formatted.endsWith(".0")) formatted = formatted.slice(0, -2);

  return `${isNegative ? "-" : ""}${formatted}${suffixes[unit]}`;
};
