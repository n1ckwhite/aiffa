import { SocialProofItem } from "@/widgets/HeroSection/parts/types";
import type { SocialProofMarqueeColors } from "../../../colors";

export type MarqueeRowProps = {
    items: SocialProofItem[];
    rowKey: string;
    colors: SocialProofMarqueeColors;
  };