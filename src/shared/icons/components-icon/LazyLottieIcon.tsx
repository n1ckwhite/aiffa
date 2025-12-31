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
  deferMs = 0,
}) => {
  const { isLottieVisible, handleLottieDomLoaded, lottieRef } =
    useLottieVisibility({ autoplay });
  const mergedBoxProps = useMergedBoxProps(boxProps);
  const isLowPerformanceDevice = useIsLowPerformanceDevice();
  const shouldRenderLottie = !isLowPerformanceDevice && Boolean(animationData);
  const [isDeferDone, setIsDeferDone] = React.useState<boolean>(deferMs <= 0);

  React.useEffect(() => {
    if (deferMs <= 0) return;
    const t = window.setTimeout(() => setIsDeferDone(true), deferMs);
    return () => window.clearTimeout(t);
  }, [deferMs]);

  return (
    <Box aria-hidden="true" {...mergedBoxProps}>
      {fallback && (
        <Box
          sx={{
            // Keep the static fallback visible until Lottie is actually allowed to render.
            // This prevents LCP from switching to an SVG (Lottie) and helps Lighthouse detect LCP correctly.
            opacity: shouldRenderLottie && isDeferDone && isLottieVisible ? 0 : 1,
            transition: "opacity 260ms ease-out",
          }}
        >
          {fallback}
        </Box>
      )}

      {shouldRenderLottie && isDeferDone && (
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


