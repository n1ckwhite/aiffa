export const formatCount = (value: number): string => {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return millions >= 10 ? `${Math.round(millions)}M` : `${millions.toFixed(1)}M`;
  }

  if (value >= 1_000) {
    const thousands = value / 1_000;
    return thousands >= 10 ? `${Math.round(thousands)}k` : `${thousands.toFixed(1)}k`;
  }

  return String(value);
};


