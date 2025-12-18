import { useAppColors } from "@/shared/theme/colors";
import { useBlogScreenColors } from "../../../colors/useBlogScreenColors/useBlogScreenColors";
import { BlogTagFilter } from "../../../lib/tags/tags";
import type { BlogArticle } from "@/widgets/Blog/types";

export type BlogScreenController = {
    theme: ReturnType<typeof useAppColors>;
    colors: ReturnType<typeof useBlogScreenColors>;
  
    // search + filters
    query: string;
    setQuery: (next: string) => void;
    debouncedQuery: string;
    tagFilter: BlogTagFilter;
    setTagFilter: (next: BlogTagFilter) => void;
    searchInputRef: React.RefObject<HTMLInputElement | null>;
  
    // data
    isLoading: boolean;
    isEmptyResults: boolean;
    pageArticles: BlogArticle[];
    pageSize: number;
  
    // pagination
    page: number;
    totalPages: number;
    canPrev: boolean;
    canNext: boolean;
    pageItems: Array<number | string>;
    handleSetPage: (next: number | ((p: number) => number)) => void;
  };