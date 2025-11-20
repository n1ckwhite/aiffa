export type MobileMenuSearchResult = {
  route: string;
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  score: number;
};

export type MobileMenuProps = {
  isOpen: boolean;
  bg: string;
  borderColor: string;
  hoverBg: string;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchBg: string;
  searchHoverBg: string;
  searchFocusBg: string;
  searchPlaceholder: string;
  searchIconColor: string;
  searchIconHoverColor: string;
  searchIconHoverBg: string;
  ringShadow: string;
  mobileDropdownTop: number | string;
  dropdownBg: string;
  dropdownBorder: string;
  dropdownShadow: string;
  scrollThumb: string;
  scrollThumbHover: string;
  emptyStateColor: string;
  chevronColor: string;
  chevronHoverColor: string;
  moduleChipOpacity: number;
  markBg: string;
  results: MobileMenuSearchResult[];
  highlightIndex: number;
  setHighlightIndex: (i: number) => void;
  onResultClick: (route: string) => void;
  onClose: () => void;
  onDonate: () => Promise<void> | void;
};



