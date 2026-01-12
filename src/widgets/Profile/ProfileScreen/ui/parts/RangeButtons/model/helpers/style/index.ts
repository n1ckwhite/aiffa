import type { StatsRange } from "../../../../../../model/types";
import { variantByState } from "../../variantByState";
import { RangeButtonStyle } from "./types";

const stateByIsActive = ["inactive", "active"] as const;


export const getRangeButtonStyle = (args: {
  value: StatsRange;
  current: StatsRange;
  headerNavIconColor: string;
}): RangeButtonStyle => {
  const { value, current, headerNavIconColor } = args;

  const isActive = value === current;
  const state = stateByIsActive[Number(isActive)];

  const styleByState: Record<(typeof stateByIsActive)[number], RangeButtonStyle> = {
    inactive: {
      variant: variantByState.inactive,
      colorScheme: undefined,
      color: undefined,
      iconColor: headerNavIconColor,
      hoverBg: "blackAlpha.50",
      activeBg: "blackAlpha.100",
    },
    active: {
      variant: variantByState.active,
      colorScheme: "blue",
      color: "white",
      iconColor: "white",
      hoverBg: "blue.600",
      activeBg: "blue.700",
    },
  };

  return styleByState[state];
};

