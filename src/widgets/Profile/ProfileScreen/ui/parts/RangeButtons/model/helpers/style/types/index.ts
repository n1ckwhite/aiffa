import { variantByState } from "../../../variantByState";

export type RangeButtonStyle = {
    variant: (typeof variantByState)["inactive" | "active"];
    colorScheme?: string;
    bg?: string;
    color?: string;
    iconColor: string;
    hoverBg?: string;
    activeBg?: string;
  };