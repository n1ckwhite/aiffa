import type { IconType } from "react-icons";
import { FiCode, FiHash, FiLayers, FiSearch, FiTag } from "react-icons/fi";

export const getTagIcon = (tag: string): IconType => {
  const t = (tag || "").toLowerCase();
  if (t === "react") return FiCode;
  if (t === "typescript") return FiHash;
  if (t === "next.js" || t === "nextjs") return FiLayers;
  if (t === "seo") return FiSearch;
  return FiTag;
};


