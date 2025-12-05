"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import lottieAnimation from "@/shared/icons/json-icons/error-robot.json";
import lottieHeroStatic from "@/shared/icons/svg-icons/lottie-hero-icon.svg";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const LottieHeroIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(lottieHeroStatic as any);
  return (
    <LazyLottieIcon
      animationData={lottieAnimation}
      boxProps={{
        w: { base: "100px", md: "100px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Декоративная иллюстрация AIFFA"
          w="100%"
          h="100%"
          objectFit="contain"
          loading="lazy"
        />
      }
    />
  );
};

export default LottieHeroIcon;

