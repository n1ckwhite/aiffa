import { useAppColors } from "@/shared/theme/colors";
import { BlogTagFilter } from "@/widgets/Blog/parts/Screen/lib/tags/types";

export type BlogHeroFiltersProps = {
    theme: ReturnType<typeof useAppColors>;
    tagFilter: BlogTagFilter;
    setTagFilter: (next: BlogTagFilter) => void;
    filterButtonBg: string;
    filterButtonBorder: string;
    filterButtonHoverBg: string;
    filterMenuBorder: string;
    filterMenuShadow: string;
    searchShadow: string;
    searchHoverShadow: string;
  };