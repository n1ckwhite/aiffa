"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessAnalystIcon from "@/shared/icons/svg-icons/business-analyst-icon.svg";
import businessAnalystAnimation from "@/shared/icons/json-icons/business-analyst.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const BusinessAnalystIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(businessAnalystIcon as any);
  return (
    <LazyLottieIcon
      animationData={businessAnalystAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1080 / 720,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка бизнес-аналитика"
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

export default BusinessAnalystIcon;


