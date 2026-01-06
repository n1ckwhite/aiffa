"use client";

import { useColorModeValue } from "@chakra-ui/react";
import { BlogArticlePageClientColors } from "./types";

export const useBlogArticlePageClientColors = (): BlogArticlePageClientColors => {
  const metaRowColor = useColorModeValue("gray.600", "gray.300");
  const calendarMetaColor = useColorModeValue("blue.600", "blue.300");
  const clockMetaColor = useColorModeValue("purple.600", "purple.300");
  const commentsMetaColor = useColorModeValue("green.600", "green.300");

  const actionIconColor = useColorModeValue("gray.600", "whiteAlpha.800");
  const copiedIconColor = useColorModeValue("green.600", "green.300");
  const ghostHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const ghostActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const ghostFocusShadow = useColorModeValue(
    "0 0 0 3px rgba(59,130,246,0.35)",
    "0 0 0 3px rgba(96,165,250,0.35)",
  );
  const savedIconActiveColor = useColorModeValue("blue.600", "blue.300");

  const mdTopBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  return {
    metaRowColor,
    calendarMetaColor,
    clockMetaColor,
    commentsMetaColor,
    actionIconColor,
    copiedIconColor,
    ghostHoverBg,
    ghostActiveBg,
    ghostFocusShadow,
    savedIconActiveColor,
    mdTopBorderColor,
  };
};


