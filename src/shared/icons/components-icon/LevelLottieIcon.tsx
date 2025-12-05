"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import levelAnimation from "@/shared/icons/json-icons/level.json";
import levelIcon from "@/shared/icons/webp-icons/level-icon.webp";

const LevelLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(levelIcon as any);
  return (
    <LazyLottieIcon
      animationData={levelAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка финансов"
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

export default LevelLottieIcon;


