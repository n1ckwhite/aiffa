import type { ReadonlyURLSearchParams } from "next/navigation";

export const hasParamCaseInsensitive = (sp: ReadonlyURLSearchParams, key: string): boolean => {
  if (sp.has(key)) return true;
  const lower = key.toLowerCase();
  if (lower !== key && sp.has(lower)) return true;
  return false;
};

