/**
 * Formats ISO date strings into a short Russian date label, e.g. "12 дек. 2025 г."
 * Returns empty string for invalid inputs.
 */
export const formatRuDate = (iso?: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return "";

  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = String(d.getFullYear());
    return `${dd}.${mm}.${yyyy}`;
  }
};


