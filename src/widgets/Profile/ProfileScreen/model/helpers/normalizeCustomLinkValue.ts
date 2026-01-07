export const normalizeCustomLinkValue = (raw: string): string => {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return "";

  const lower = (value: string): string => value.toLowerCase();

  const isValidHostname = (hostname: string): boolean => {
    const h = hostname.toLowerCase();
    if (!h) return false;
    if (h === "localhost") return true;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) return true; // ipv4 (best-effort)
    if (!h.includes(".")) return false;
    if (!/^[a-z0-9.-]+$/.test(h)) return false;
    if (/^\./.test(h) || /\.$/.test(h)) return false;
    if (h.includes("..")) return false;
    // No empty labels, no leading/trailing hyphens per label
    const labels = h.split(".");
    if (labels.some((p) => !p || p.startsWith("-") || p.endsWith("-"))) return false;
    return true;
  };

  const normalizeAndValidateHttpUrl = (urlString: string): string => {
    try {
      const url = new URL(urlString);
      const protocol = url.protocol.toLowerCase();
      if (protocol !== "http:" && protocol !== "https:") return "";
      if (!isValidHostname(url.hostname)) return "";
      // User request: lower-case everything, always.
      return lower(urlString);
    } catch {
      return "";
    }
  };

  const normalizeAllowedHttpUrl = (scheme: "http" | "https", restRaw: string): string => {
    const rest = restRaw.replace(/^\/+/, ""); // remove any amount of leading slashes
    if (!rest) return "";
    const withTwoSlashes = `${scheme}://${rest}`;

    return normalizeAndValidateHttpUrl(withTwoSlashes);
  };

  // Only allow http/https. Any other scheme is treated as "custom" and normalized to https://
  // Also: always lower-case the entire URL string.
  //
  // Examples:
  // - HTTP://GitHub.com/N1ckWhite -> http://github.com/n1ckwhite
  // - https:///Example.com -> https://example.com
  // - ht://Example.com -> https://example.com
  if (/^https?:/i.test(trimmed)) {
    const schemeEnd = trimmed.indexOf(":");
    const schemeRaw = trimmed.slice(0, schemeEnd).toLowerCase();
    const scheme = schemeRaw === "http" ? "http" : "https";
    const restRaw = trimmed.slice(schemeEnd + 1);
    return normalizeAllowedHttpUrl(scheme, restRaw);
  }

  // Has an unsupported scheme (mailto:, tg:, ftp:, ht:, etc.) — drop it and force https://
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    const schemeEnd = trimmed.indexOf(":");
    const restRaw = trimmed.slice(schemeEnd + 1);
    return normalizeAllowedHttpUrl("https", restRaw);
  }

  // Scheme-relative URLs like //example.com
  if (trimmed.startsWith("//")) return normalizeAllowedHttpUrl("https", trimmed);

  // If user starts with symbols (____, ...., ====) — treat as invalid (don't save/show).
  if (!/^[a-z0-9]/i.test(trimmed)) return "";

  return normalizeAllowedHttpUrl("https", `//${trimmed}`);
};


