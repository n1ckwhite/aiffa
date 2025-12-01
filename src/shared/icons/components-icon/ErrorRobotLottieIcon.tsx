"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import robotAnimation from "@/shared/icons/json-icons/error-robot.json";
import robotIcon from "@/shared/icons/svg-icons/error-robot-icon.svg";
const ErrorLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(robotIcon);
  return (
    <LazyLottieIcon
      animationData={robotAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1080 / 1080,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка ошибки"
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

export default ErrorLottieIcon;


