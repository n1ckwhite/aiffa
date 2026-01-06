export const normalizeCustomLinkValue = (raw: string): string => {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return "";

  // Already has a scheme: https://, http://, mailto:, tg:, etc.
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;

  // Scheme-relative URLs like //example.com
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  return `https://${trimmed}`;
};


