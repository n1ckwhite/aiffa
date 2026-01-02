import type { useAppColors } from "@/shared/theme/colors";

export type BlogHeroFavoritesToggleProps = {
  theme: ReturnType<typeof useAppColors>;
  isActive: boolean;
  onToggle: () => void;

  filterButtonBg: string;
  filterButtonBorder: string;
  filterButtonHoverBg: string;
  searchShadow: string;
  searchHoverShadow: string;
};


