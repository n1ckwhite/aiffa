"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import sessionsIcon from "@/shared/icons/webp-icons/sessions-icon.webp";
import sessionsAnimation from "@/shared/icons/json-icons/sessions.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const SessionsLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(sessionsIcon);
  return (
    <LazyLottieIcon
      animationData={sessionsAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 750 / 500,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка сессий"
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

export default SessionsLottieIcon;


