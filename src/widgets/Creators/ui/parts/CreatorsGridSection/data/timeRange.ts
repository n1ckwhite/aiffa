import { FiCalendar, FiClock, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { TimeRangeValue } from "../types";

export const TIME_RANGE_ITEMS: { value: TimeRangeValue; label: string }[] = [
  { value: "week", label: "За неделю" },
  { value: "month", label: "За месяц" },
  { value: "year", label: "За год" },
  { value: "all", label: "За всё время" },
];

export const TIME_RANGE_BADGE_ICONS: Record<TimeRangeValue, IconType> = {
  week: FiClock,
  month: FiCalendar,
  year: FiTrendingUp,
  all: FiTrendingUp,
};


