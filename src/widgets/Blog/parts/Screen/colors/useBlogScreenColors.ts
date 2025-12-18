import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import type { PaginationColors } from "shared/ui/Pagination";
import type { useAppColors } from "@/shared/theme/colors";

type UseBlogScreenColorsResult = {
  categoryColor: string;
  cardRadius: string;
  cardPadding: string;

  controlsBg: string;
  controlsBorder: string;
  controlsHoverBg: string;
  controlsIcon: string;

  cardBorder: string;
  cardHoverBorder: string;
  cardShadow: string;
  cardHoverShadow: string;

  searchBg: string;
  searchBorder: string;
  searchShadow: string;
  searchHoverShadow: string;
  searchHoverBorder: string;
  searchPlaceholder: string;
  searchIconBg: string;
  clearButtonHoverBg: string;
  clearButtonActiveBg: string;

  writeCtaBorderColor: string;
  writeCtaBoxShadow: string;
  writeCtaBgGradient: string;
  writeCtaIconBg: string;
  writeCtaIconBorderColor: string;

  filterButtonBg: string;
  filterButtonBorder: string;
  filterButtonHoverBg: string;
  filterMenuBorder: string;
  filterMenuShadow: string;

  paginationColors: PaginationColors;
};

/**
 * Centralized color tokens for BlogScreen to keep the main component lean.
 */
type BlogScreenTheme = ReturnType<typeof useAppColors>;

export const useBlogScreenColors = (theme: BlogScreenTheme): UseBlogScreenColorsResult => {
  const categoryColor = theme.blue.accent;
  const cardRadius = "2xl";
  const cardPadding = "20px";

  const controlsBg = useColorModeValue("white", "gray.800");
  const controlsBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const controlsHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const controlsIcon = useColorModeValue("gray.700", "gray.200");

  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const cardHoverBorder = useColorModeValue(theme.blue.chipBorder, "blue.400");
  const cardShadow = useColorModeValue("0 10px 28px rgba(15, 23, 42, 0.08)", "0 12px 30px rgba(0, 0, 0, 0.35)");
  const cardHoverShadow = useColorModeValue("0 18px 44px rgba(15, 23, 42, 0.14)", "0 18px 44px rgba(0, 0, 0, 0.45)");

  const searchBg = useColorModeValue("white", "gray.800");
  const searchBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const searchShadow = useColorModeValue("0 10px 26px rgba(15, 23, 42, 0.08)", "0 14px 28px rgba(0, 0, 0, 0.35)");
  const searchHoverShadow = useColorModeValue("0 14px 34px rgba(15, 23, 42, 0.12)", "0 16px 34px rgba(0, 0, 0, 0.45)");
  const searchHoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const searchPlaceholder = useColorModeValue("gray.500", "whiteAlpha.700");
  const searchIconBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const clearButtonHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const clearButtonActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.300");

  const writeCtaBorderColor = useColorModeValue("blue.200", "blue.500");
  const writeCtaBoxShadow = useColorModeValue("0 18px 46px rgba(59,130,246,0.14)", "0 18px 46px rgba(0, 0, 0, 0.45)");
  const writeCtaBgGradient = useColorModeValue(
    "linear(to-r, rgba(59,130,246,0.10), rgba(255,255,255,0.70))",
    "linear(to-r, rgba(59,130,246,0.14), rgba(255,255,255,0.06))",
  );
  const writeCtaIconBg = useColorModeValue("white", "blackAlpha.200");
  const writeCtaIconBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  const filterButtonBg = useColorModeValue("white", "gray.800");
  const filterButtonBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const filterButtonHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const filterMenuBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const filterMenuShadow = useColorModeValue("0 18px 44px rgba(15, 23, 42, 0.14)", "0 18px 44px rgba(0, 0, 0, 0.55)");

  const paginationColors = React.useMemo(
    () => ({
      controlsBg,
      controlsBorder,
      controlsHoverBg,
      controlsIcon,
      descColor: theme.descColor,
    }),
    [controlsBg, controlsBorder, controlsHoverBg, controlsIcon, theme.descColor],
  );

  return {
    categoryColor,
    cardRadius,
    cardPadding,
    controlsBg,
    controlsBorder,
    controlsHoverBg,
    controlsIcon,
    cardBorder,
    cardHoverBorder,
    cardShadow,
    cardHoverShadow,
    searchBg,
    searchBorder,
    searchShadow,
    searchHoverShadow,
    searchHoverBorder,
    searchPlaceholder,
    searchIconBg,
    clearButtonHoverBg,
    clearButtonActiveBg,
    writeCtaBorderColor,
    writeCtaBoxShadow,
    writeCtaBgGradient,
    writeCtaIconBg,
    writeCtaIconBorderColor,
    filterButtonBg,
    filterButtonBorder,
    filterButtonHoverBg,
    filterMenuBorder,
    filterMenuShadow,
    paginationColors,
  };
};


