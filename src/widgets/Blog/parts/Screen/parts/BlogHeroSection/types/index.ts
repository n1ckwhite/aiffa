import type { useAppColors } from "@/shared/theme/colors";
import type { BlogTagFilter } from "../../../lib/tags/types";

export type BlogHeroSectionProps = {
  theme: ReturnType<typeof useAppColors>;
  isEmptyResults: boolean;

  query: string;
  setQuery: (next: string) => void;
  tagFilter: BlogTagFilter;
  setTagFilter: (next: BlogTagFilter) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;

  searchBg: string;
  searchBorder: string;
  searchShadow: string;
  searchHoverShadow: string;
  searchHoverBorder: string;
  searchPlaceholder: string;
  searchIconBg: string;
  clearButtonHoverBg: string;
  clearButtonActiveBg: string;

  filterButtonBg: string;
  filterButtonBorder: string;
  filterButtonHoverBg: string;
  filterMenuBorder: string;
  filterMenuShadow: string;
};


