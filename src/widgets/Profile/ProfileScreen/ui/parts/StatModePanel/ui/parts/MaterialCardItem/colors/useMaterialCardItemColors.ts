import React from "react";
import { useModuleLessonsColors } from "widgets/ModuleLessons/colors";

export type MaterialCardItemColors = {
  colors: any;
  levelAccent: string;
  metaColor: string;
  accentColor: string;
  chipBorder: string;
  getLevelAccent: (level: "beginner" | "middle" | "advanced") => string;
  getLevelScheme: (level: "beginner" | "middle" | "advanced") => "green" | "yellow" | "red";
  statusBadgeColors: {
    bg: string;
    border: string;
    text: string;
  };
};

export const useMaterialCardItemColors = (): MaterialCardItemColors => {
  const colors = useModuleLessonsColors();

  const levelAccent = colors?.beginnerBorder ?? colors?.blue?.accent ?? "blue.400";
  const metaColor = colors?.descColor ?? "gray.500";
  const accentColor = colors?.accent ?? colors?.blue?.accent ?? "blue.400";
  const chipBorder = colors?.chipBorder ?? colors?.blue?.chipBorder ?? "blackAlpha.200";
  const statusBadgeColors = React.useMemo(
    () => ({
      bg: "yellow.100",
      border: "yellow.300",
      text: "yellow.700",
    }),
    [],
  );

  const getLevelScheme = React.useCallback((level: "beginner" | "middle" | "advanced") => {
    if (level === "middle") return "yellow";
    if (level === "advanced") return "red";
    return "green";
  }, []);

  const getLevelAccent = React.useCallback(
    (level: "beginner" | "middle" | "advanced") => {
      if (level === "middle") return colors?.intermediateBorder ?? "yellow.400";
      if (level === "advanced") return colors?.advancedBorder ?? "red.400";
      return colors?.beginnerBorder ?? "green.400";
    },
    [colors?.advancedBorder, colors?.beginnerBorder, colors?.intermediateBorder],
  );

  return React.useMemo(
    () => ({
      colors,
      levelAccent,
      metaColor,
      accentColor,
      chipBorder,
      getLevelAccent,
      getLevelScheme,
      statusBadgeColors,
    }),
    [accentColor, chipBorder, colors, getLevelAccent, getLevelScheme, levelAccent, metaColor, statusBadgeColors],
  );
};

