import type { StatsRange } from "../../../../model/types";

export type RangeButtonsProps = {
  value: StatsRange;
  onChange: (next: StatsRange) => void;
  justify?: "flex-start" | "flex-end" | "center";
};


