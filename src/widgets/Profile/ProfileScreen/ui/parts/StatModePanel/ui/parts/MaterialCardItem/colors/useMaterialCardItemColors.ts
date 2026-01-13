import React from "react";
import { useModuleLessonsColors } from "widgets/ModuleLessons/colors";

export type MaterialCardItemColors = {
  colors: any;
  levelAccent: string;
  metaColor: string;
  accentColor: string;
  chipBorder: string;
};

export const useMaterialCardItemColors = (): MaterialCardItemColors => {
  const colors = useModuleLessonsColors();

  const levelAccent = colors?.beginnerBorder ?? colors?.blue?.accent ?? "blue.400";
  const metaColor = colors?.descColor ?? "gray.500";
  const accentColor = colors?.accent ?? colors?.blue?.accent ?? "blue.400";
  const chipBorder = colors?.chipBorder ?? colors?.blue?.chipBorder ?? "blackAlpha.200";

  return React.useMemo(
    () => ({ colors, levelAccent, metaColor, accentColor, chipBorder }),
    [colors, levelAccent, metaColor, accentColor, chipBorder],
  );
};

