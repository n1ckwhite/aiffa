import type React from "react";
import type { BoxProps } from "@chakra-ui/react";

export type LazyLottieIconProps = {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  boxProps?: BoxProps;
  fallback?: React.ReactNode;
  lottieStyle?: React.CSSProperties;
};

export type UseLottieVisibilityParams = {
  autoplay: boolean;
};

export type UseLottieVisibilityResult = {
  isLottieVisible: boolean;
  handleLottieDomLoaded: () => void;
  lottieRef: React.RefObject<any>;
};


