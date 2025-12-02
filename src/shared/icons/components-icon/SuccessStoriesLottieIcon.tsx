"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import sucessStoriesAnimation from "@/shared/icons/json-icons/success-stories.json";
import successStoriesIcon from "@/shared/icons/svg-icons/success-stories-icon.svg";

const SuccessStoriesLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(successStoriesIcon);
  return (
    <LazyLottieIcon
      animationData={sucessStoriesAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
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


