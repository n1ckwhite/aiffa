"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import lottieAnimation from "@/shared/icons/json-icons/lottie.json";
import lottieHeroStatic from "@/shared/icons/webp-icons/lottie-hero-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const LottieHeroIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={lottieAnimation}
      boxProps={{
        w: { base: "100px", md: "100px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={lottieHeroStatic}
          alt="Декоративная иллюстрация AIFFA"
          width={100}
          height={100}
          sizes="100px"
        />
      }
    />
  );
};

export default LottieHeroIcon;

