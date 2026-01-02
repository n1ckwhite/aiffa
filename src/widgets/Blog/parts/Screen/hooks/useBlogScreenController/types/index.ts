import { useAppColors } from "@/shared/theme/colors";
import { useBlogScreenColors } from "../../../colors/useBlogScreenColors/useBlogScreenColors";
import type { BlogTagFilter } from "../../../lib/tags/types";
import type { BlogArticle } from "@/widgets/Blog/types";

export type BlogScreenController = {
    theme: ReturnType<typeof useAppColors>;
    colors: ReturnType<typeof useBlogScreenColors>;
  
    // search + filters
    query: string;
    setQuery: (next: string) => void;
    tagFilter: BlogTagFilter;
    setTagFilter: (next: BlogTagFilter) => void;
    favoritesOnly: boolean;
    setFavoritesOnly: (next: boolean) => void;
    favoritesCount: number;
    searchInputRef: React.RefObject<HTMLInputElement | null>;
  
    // data
    isLoading: boolean;
    isEmptyResults: boolean;
    emptyStateVariant: "search" | "favoritesEmpty" | "favoritesSearch";
    pageArticles: BlogArticle[];
    pageSize: number;
  
    // pagination
    page: number;
    totalPages: number;
    canPrev: boolean;
    canNext: boolean;
    pageItems: Array<number | string>;
    getPageHref: (page: number) => string;
  };