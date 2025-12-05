"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import partnersAnimation from "@/shared/icons/json-icons/partners.json";
import partnersIcon from "@/shared/icons/webp-icons/partners-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const PartnersLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={partnersAnimation}
      boxProps={{
        w: { base: "270px", md: "350px" },
        aspectRatio: 2475 / 1650,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={partnersIcon}
          alt="Иконка партнеров"
          width={350}
          height={234}
          sizes="350px"
          priority
        />
      }
    />
  );
};

export default PartnersLottieIcon;


