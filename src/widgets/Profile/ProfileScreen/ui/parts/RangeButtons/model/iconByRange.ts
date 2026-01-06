import type { IconType } from "react-icons";
import { FaCalendarAlt, FaInfinity, FaRegCalendarAlt } from "react-icons/fa";
import type { StatsRange } from "../../../../model/types";

export const iconByRange: Record<StatsRange, IconType> = {
  week: FaRegCalendarAlt,
  month: FaCalendarAlt,
  all: FaInfinity,
};


