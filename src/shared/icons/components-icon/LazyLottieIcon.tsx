"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LazyLottieIconProps = {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  boxProps?: BoxProps;
  fallback?: React.ReactNode;
  lottieStyle?: CSSProperties;
};

const LazyLottieIcon: React.FC<LazyLottieIconProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  boxProps,
  fallback,
  lottieStyle,
}) => {
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [isLottieReady, setIsLottieReady] = useState(false);
  const lottieRef = useRef<any>(null);

  // Запасной вариант: если по какой-то причине Lottie долго инициализируется,
  // всё равно переключимся на неё через небольшой тайм-аут.
  useEffect(() => {
    const fallbackTimeoutId = window.setTimeout(() => {
      setIsLottieVisible((prev) => prev || true);
    }, 800);

    return () => window.clearTimeout(fallbackTimeoutId);
  }, []);

  // Как только Lottie готова и видима — запускаем анимацию с первого кадра.
  useEffect(() => {
    if (!autoplay) return;
    if (!isLottieVisible || !isLottieReady || !lottieRef.current) return;

    // Стартуем строго с начала, чтобы картинка соответствовала статику.
    lottieRef.current.goToAndStop(0, true);
    lottieRef.current.play();
  }, [autoplay, isLottieVisible, isLottieReady]);

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
          lottieRef={lottieRef}
          animationData={animationData}
          loop={loop}
          autoplay={false}
          onDOMLoaded={() => {
            setIsLottieReady(true);
            setIsLottieVisible(true);
          }}
          style={{
            width: "100%",
            height: "100%",
            opacity: isLottieVisible ? 1 : 0,
            transition: "opacity 260ms ease-out",
            ...lottieStyle,
          }}
        />
      </Box>
    </Box>
  );
};

export default LazyLottieIcon;


