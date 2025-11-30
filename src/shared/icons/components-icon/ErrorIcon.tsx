"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import errorIcon from "@/shared/icons/svg-icons/error-icon.svg";
import errorAnimation from "@/shared/icons/json-icons/404.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const ErrorIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(errorIcon as any);
  return (
    <LazyLottieIcon
      animationData={errorAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 591 / 420,
        mx: "auto",
        mb: 4,
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

export default ErrorIcon;

