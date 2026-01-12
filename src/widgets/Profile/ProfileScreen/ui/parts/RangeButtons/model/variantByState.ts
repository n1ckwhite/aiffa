export type RangeButtonState = "inactive" | "active";

export const variantByState: Record<RangeButtonState, "ghost" | "solid"> = {
  inactive: "ghost",
  active: "solid",
};


