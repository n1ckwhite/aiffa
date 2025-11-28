"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LazyLottieIconProps = {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  boxProps?: BoxProps;
};

const LazyLottieIcon: React.FC<LazyLottieIconProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  boxProps,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "120px",
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      aria-hidden="true"
      {...boxProps}
    >
      {isVisible && (
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </Box>
  );
};

export default LazyLottieIcon;


