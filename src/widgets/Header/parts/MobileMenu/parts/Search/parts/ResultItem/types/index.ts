import type { MobileMenuSearchResult } from '../../../../../types';

export type ResultItemProps = {
  result: MobileMenuSearchResult;
  idx: number;
  isActive: boolean;
  chevronColor: string;
  chevronHoverColor: string;
  moduleChipOpacity: number;
  markBg: string;
  searchQuery: string;
  onMouseEnter: () => void;
  onResultClick: () => void;
  getChipColors: (moduleId: string) => { bg: string; border: string; text: string };
  resultActiveBg: string;
  resultHoverBg: string;
  highlightText: (text: string, query: string, mark: string) => React.ReactNode;
};



