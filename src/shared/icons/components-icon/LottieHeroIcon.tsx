"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import lottieAnimation from "@/shared/icons/json-icons/lottie.json";
import lottieHeroStatic from "@/shared/icons/svg-icons/lottie-hero-icon.svg";

const LottieHeroIcon: React.FC = () => {
  const raw = lottieHeroStatic as any;
  const staticSrc: string =
    (typeof raw === "string" && raw) ||
    (raw && typeof raw.src === "string" && raw.src) ||
    (raw && typeof raw.default === "string" && raw.default) ||
    "";
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

