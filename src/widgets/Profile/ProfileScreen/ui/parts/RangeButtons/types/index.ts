import type { StatsRange } from "../../../../model/types";

export type RangeButtonsProps = {
  paramKey: "stats" | "contribution";
  value: StatsRange;
  defaultValue?: StatsRange;
  justify?: "flex-start" | "flex-end" | "center";
};


