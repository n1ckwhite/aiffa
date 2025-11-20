import type { MobileMenuSearchResult } from '../../../types';

export type MobileSearchProps = {
  isOpen: boolean;
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
  getChipColors: (level: 'beginner' | 'intermediate' | 'advanced') => { bg: string; border: string; text: string };
  getLevelByModuleId: (moduleId: string) => 'beginner' | 'intermediate' | 'advanced';
  resultActiveBg: string;
  resultHoverBg: string;
};



