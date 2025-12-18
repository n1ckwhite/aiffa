import { useAppColors } from "@/shared/theme/colors";

export type BlogHeroSearchProps = {
    theme: ReturnType<typeof useAppColors>;
    isEmptyResults: boolean;
    query: string;
    setQuery: (next: string) => void;
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
  };