"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import type { LazyLottieIconProps } from "./types/lazyLottieIcon";
import { useLottieVisibility } from "./hooks/useLottieVisibility";
import { useMergedBoxProps } from "./hooks/useMergedBoxProps";
import { useIsLowPerformanceDevice } from "./hooks/useIsLowPerformanceDevice";

const LazyLottieIcon: React.FC<LazyLottieIconProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  boxProps,
  fallback,
  lottieStyle,
}) => {
  const { isLottieVisible, handleLottieDomLoaded, lottieRef } =
    useLottieVisibility({ autoplay });
  const mergedBoxProps = useMergedBoxProps(boxProps);
  const isLowPerformanceDevice = useIsLowPerformanceDevice();
  const shouldRenderLottie = !isLowPerformanceDevice && Boolean(animationData);

  return (
    <Box aria-hidden="true" {...mergedBoxProps}>
      {fallback && (
        <Box
          sx={{
            opacity: shouldRenderLottie && isLottieVisible ? 0 : 1,
            transition: "opacity 260ms ease-out",
          }}
        >
          {fallback}
        </Box>
      )}

      {shouldRenderLottie && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={loop}
            autoplay={false}
            onDOMLoaded={handleLottieDomLoaded}
            style={{
              width: "100%",
              height: "100%",
              ...lottieStyle,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LazyLottieIcon;


