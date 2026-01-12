export const buildUsernameFallback = (rawName: string): string => {
  const lower = rawName.trim().toLowerCase();
  if (!lower) return "";

  const allowed = lower.replace(/[^a-z0-9\s._-]/g, "");
  const dotted = allowed.replace(/\s+/g, ".").replace(/\.{2,}/g, ".");
  const trimmed = dotted.replace(/^\.+/, "").replace(/\.+$/, "");
  return trimmed.slice(0, 24);
};

