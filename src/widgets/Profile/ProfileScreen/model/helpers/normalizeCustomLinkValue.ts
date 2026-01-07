type LinkValidationError =
  | "invalid_format"
  | "invalid_domain"
  | "unsupported_scheme"
  | "forbidden_localhost";

export type LinkValidationResult = {
  normalized: string;
  error: LinkValidationError | null;
};

const lower = (value: string): string => value.toLowerCase();

const isForbiddenHost = (hostname: string): boolean => {
  const h = hostname.toLowerCase();
  return h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0";
};

const isValidHostname = (hostname: string): boolean => {
  const h = hostname.toLowerCase();
  if (!h) return false;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) return true; // ipv4 (best-effort)
  if (!h.includes(".")) return false;
  if (!/^[a-z0-9.-]+$/.test(h)) return false;
  if (/^\./.test(h) || /\.$/.test(h)) return false;
  if (h.includes("..")) return false;
  const labels = h.split(".");
  if (labels.some((p) => !p || p.startsWith("-") || p.endsWith("-"))) return false;
  return true;
};

const normalizeAllowedHttpUrl = (scheme: "http" | "https", restRaw: string): LinkValidationResult => {
  const rest = String(restRaw ?? "").replace(/^\/+/, "");
  if (!rest) return { normalized: "", error: "invalid_format" };

  const candidate = `${scheme}://${rest}`;
  try {
    const url = new URL(candidate);
    const protocol = url.protocol.toLowerCase();
    if (protocol !== "http:" && protocol !== "https:") return { normalized: "", error: "unsupported_scheme" };
    if (isForbiddenHost(url.hostname)) return { normalized: "", error: "forbidden_localhost" };
    if (!isValidHostname(url.hostname)) return { normalized: "", error: "invalid_domain" };

    // User request: lower-case everything, always.
    const normalized = lower(`${url.protocol}//${url.host}${url.pathname}${url.search}${url.hash}`);
    return { normalized, error: null };
  } catch {
    return { normalized: "", error: "invalid_format" };
  }
};

export const validateCustomLinkValue = (raw: string): LinkValidationResult => {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return { normalized: "", error: null };

  // If user starts with symbols (____, ...., ====) — treat as invalid.
  if (!/^[a-z0-9]/i.test(trimmed) && !trimmed.startsWith("//") && !/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return { normalized: "", error: "invalid_format" };
  }

  // Scheme-relative URLs like //example.com
  if (trimmed.startsWith("//")) return normalizeAllowedHttpUrl("https", trimmed);

  // Explicit scheme present
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    const schemeEnd = trimmed.indexOf(":");
    const schemeRaw = trimmed.slice(0, schemeEnd).toLowerCase();
    if (schemeRaw !== "http" && schemeRaw !== "https") {
      return { normalized: "", error: "unsupported_scheme" };
    }
    const scheme = schemeRaw === "http" ? "http" : "https";
    const restRaw = trimmed.slice(schemeEnd + 1);
    return normalizeAllowedHttpUrl(scheme, restRaw);
  }

  // No scheme: assume https://
  return normalizeAllowedHttpUrl("https", `//${trimmed}`);
};

export const linkErrorMessageByCode: Record<LinkValidationError, string> = {
  forbidden_localhost: "Локальные адреса (localhost, 127.0.0.1) запрещены.",
  unsupported_scheme: "Разрешены только ссылки с http:// или https://",
  invalid_domain: "Некорректный домен. Пример: https://github.com/username",
  invalid_format: "Некорректная ссылка.",
};

export const normalizeCustomLinkValue = (raw: string): string => {
  const { normalized, error } = validateCustomLinkValue(raw);
  if (error) return "";
  return normalized;
};


