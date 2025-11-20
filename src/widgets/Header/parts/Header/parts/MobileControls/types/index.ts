export type MobileControlsProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  setSearchQuery: (s: string) => void;
  setSearchOpen: (v: boolean) => void;
  setResults: (r: any[]) => void;
  toggleColorMode: () => void;
};



