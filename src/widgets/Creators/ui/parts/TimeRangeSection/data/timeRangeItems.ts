import type { FilterBarItem } from "shared/ui/FilterBar";
import type { TimeRangeValue } from "../types";

export const TIME_RANGE_ITEMS: FilterBarItem<TimeRangeValue>[] = [
  { value: "week", label: "За неделю" },
  { value: "month", label: "За месяц" },
  { value: "year", label: "За год" },
  { value: "all", label: "За всё время" },
];


