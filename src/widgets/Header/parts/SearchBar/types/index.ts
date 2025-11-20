export type SearchResult = {
  route: string;
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  score: number;
};

export type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (val: boolean) => void;
  onInputKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  results: SearchResult[];
  highlightIndex: number;
  setHighlightIndex: (fn: (i: number) => number) => void;
  onResultClick: (route: string) => void;
  ringShadow: string;
  dropdownShadow: string;
  overlayBg: string;
  dropdownBg: string;
  dropdownBorder: string;
  searchBg: string;
  searchHoverBg: string;
  searchFocusBg: string;
  searchPlaceholder: string;
  searchIconColor: string;
  searchIconHoverColor: string;
  searchIconHoverBg: string;
  scrollThumb: string;
  scrollThumbHover: string;
  emptyStateColor: string;
  chevronColor: string;
  chevronHoverColor: string;
  moduleChipOpacity: number;
  markBg: string;
  isMobileMenuOpen: boolean;
};



