import React from "react";
import { TIME_RANGE_BADGE_ICONS } from "../data/timeRange";
import type { TimeRangeValue } from "../types";

export const useTimeRange = () => {
  const [timeRange, setTimeRange] = React.useState<TimeRangeValue>("all");
  const TimeRangeBadgeIcon = TIME_RANGE_BADGE_ICONS[timeRange];
  const isDefaultTimeRange = timeRange === "all";

  return { timeRange, setTimeRange, TimeRangeBadgeIcon, isDefaultTimeRange };
};


