export type RangeButtonState = "inactive" | "active";

export const variantByState: Record<RangeButtonState, "outline" | "solid"> = {
  inactive: "outline",
  active: "solid",
};


