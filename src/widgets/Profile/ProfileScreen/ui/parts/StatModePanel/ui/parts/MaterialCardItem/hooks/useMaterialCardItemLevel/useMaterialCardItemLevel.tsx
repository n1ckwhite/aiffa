"use client";

import React from "react";
import { UseMaterialCardItemLevelArgs, UseMaterialCardItemLevelResult } from "./types";

export const useMaterialCardItemLevel = ({
  level,
  getLevelAccent,
  getLevelScheme,
}: UseMaterialCardItemLevelArgs): UseMaterialCardItemLevelResult => {
  const normalizedLevel = level ?? "beginner";
  const levelLabel =
    normalizedLevel === "beginner" ? "Начальный" : normalizedLevel === "middle" ? "Средний" : "Продвинутый";
  const levelScheme = getLevelScheme(normalizedLevel);
  const levelAccent = getLevelAccent(normalizedLevel);

  return React.useMemo(
    () => ({ levelLabel, levelScheme, levelAccent }),
    [levelAccent, levelLabel, levelScheme],
  );
};
