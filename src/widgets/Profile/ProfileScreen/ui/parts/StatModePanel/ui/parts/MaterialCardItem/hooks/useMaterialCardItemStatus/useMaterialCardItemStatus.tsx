"use client";

import React from "react";
import { buildTopBefore } from "widgets/ModuleLessons/parts/ModuleLessonsView/parts/LessonsGrid/parts/ItemCard/helpers";
import { UseMaterialCardItemStatusArgs, UseMaterialCardItemStatusResult } from "./types";

export const useMaterialCardItemStatus = ({
  status,
  colors,
  levelAccent,
  statusBadgeColors,
}: UseMaterialCardItemStatusArgs): UseMaterialCardItemStatusResult => {
  const isCompletedMaterial = status === undefined;
  const isPending = status === "pending";
  const isSuccess = status === "success";
  const showStatusBadge = isPending;
  const statusLabel = "В обработке";
  const statusBg = statusBadgeColors.bg;
  const statusBorderColor = statusBadgeColors.border;
  const statusTextColor = statusBadgeColors.text;
  const statusBorder = isCompletedMaterial ? "green.300" : colors.borderColor;
  const statusBorderHover = isCompletedMaterial ? "green.400" : levelAccent;
  const topBefore = isCompletedMaterial ? undefined : buildTopBefore(levelAccent);

  return React.useMemo(
    () => ({
      isCompletedMaterial,
      isPending,
      isSuccess,
      showStatusBadge,
      statusLabel,
      statusBg,
      statusBorderColor,
      statusTextColor,
      statusBorder,
      statusBorderHover,
      topBefore,
    }),
    [
      isCompletedMaterial,
      isPending,
      isSuccess,
      levelAccent,
      showStatusBadge,
      statusBg,
      statusBorder,
      statusBorderColor,
      statusBorderHover,
      statusLabel,
      statusTextColor,
      topBefore,
    ],
  );
};
