"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import lottieAnimation from "@/shared/icons/json-icons/lottie.json";
import lottieHeroStatic from "@/shared/icons/lottie-hero-icon.svg";

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
      boxProps={{ w: { base: "100px", md: "100px" }, mx: "auto" }}
      fallback={
        <Image
          src={staticSrc}
          alt="Декоративная иллюстрация AIFFA"
          w="100%"
          h="auto"
          loading="lazy"
        />
      }
    />
  );
};

export default LottieHeroIcon;

