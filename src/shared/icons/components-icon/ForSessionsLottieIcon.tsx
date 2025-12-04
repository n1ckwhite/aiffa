"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import forSessionsIcon from "@/shared/icons/svg-icons/for-sessions-icon.svg";
import forSessionsAnimation from "shared/icons/json-icons/for-sessions.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const ForSessionsLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(forSessionsIcon);
  return (
    <LazyLottieIcon
      animationData={forSessionsAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 600 / 500,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка форм сессий"
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

export default ForSessionsLottieIcon;


