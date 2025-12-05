"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import rewardsAnimation from "@/shared/icons/json-icons/rewards.json";
import rewardsIcon from "@/shared/icons/webp-icons/rewards-icon.webp";

const SuccessStoriesLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(rewardsIcon);
  return (
    <LazyLottieIcon
      animationData={rewardsAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка успешных историй"
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

export default SuccessStoriesLottieIcon;


