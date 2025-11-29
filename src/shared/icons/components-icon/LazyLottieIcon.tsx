"use client";

import React, { useEffect, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LazyLottieIconProps = {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  boxProps?: BoxProps;
  fallback?: React.ReactNode;
};

const LazyLottieIcon: React.FC<LazyLottieIconProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  boxProps,
  fallback,
}) => {
  const [isLottieVisible, setIsLottieVisible] = useState(false);

  useEffect(() => {
    const fallbackTimeoutId = window.setTimeout(() => {
      setIsLottieVisible(true);
    }, 600);

    return () => window.clearTimeout(fallbackTimeoutId);
  }, []);

  const mergedBoxProps: BoxProps = {
    position: boxProps?.position ?? "relative",
    overflow: boxProps?.overflow ?? "hidden",
    ...boxProps,
  };

  return (
    <Box aria-hidden="true" {...mergedBoxProps}>
      {fallback && (
        <Box
          sx={{
            opacity: isLottieVisible ? 0 : 1,
            transition: "opacity 260ms ease-out",
          }}
        >
          {fallback}
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          onDOMLoaded={() => setIsLottieVisible(true)}
          style={{
            width: "100%",
            height: "100%",
            opacity: isLottieVisible ? 1 : 0,
            transition: "opacity 260ms ease-out",
          }}
        />
      </Box>
    </Box>
  );
};

export default LazyLottieIcon;


