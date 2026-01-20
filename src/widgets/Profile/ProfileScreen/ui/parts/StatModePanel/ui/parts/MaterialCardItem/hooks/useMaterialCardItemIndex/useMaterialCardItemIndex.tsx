"use client";

import React from "react";
import { UseMaterialCardItemIndexArgs, UseMaterialCardItemIndexResult } from "./types";

export const useMaterialCardItemIndex = ({
  listIndex,
  isCompletedMaterial,
}: UseMaterialCardItemIndexArgs): UseMaterialCardItemIndexResult => {
  const showIndexChip = isCompletedMaterial;
  const showIndexNumber = !isCompletedMaterial && typeof listIndex === "number";
  const indexLabel = typeof listIndex === "number" ? listIndex + 1 : null;

  return React.useMemo(
    () => ({
      showIndexChip,
      showIndexNumber,
      indexLabel,
    }),
    [indexLabel, showIndexChip, showIndexNumber],
  );
};
