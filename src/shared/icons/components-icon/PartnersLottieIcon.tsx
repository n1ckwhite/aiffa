"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import partnersAnimation from "@/shared/icons/json-icons/partners.json";
import partnersIcon from "@/shared/icons/svg-icons/partners-icon.svg";
const PartnersLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(partnersIcon as any);
  return (
    <LazyLottieIcon
      animationData={partnersAnimation}
      boxProps={{
        w: { base: "270px", md: "350px" },
        aspectRatio: 2475 / 1650,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка партнеров"
          w="100%"
          h="100%"
          objectFit="contain"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      }
    />
  );
};

export default PartnersLottieIcon;


