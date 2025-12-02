"use client";
import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import businessAnalyticsAnimation from "@/shared/icons/json-icons/business-analytics.json";
import businessAnalyticsIcon from "@/shared/icons/svg-icons/business-analystics-icon.svg";

const BusinessAnalyticsIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(businessAnalyticsIcon);
  return (
    <LazyLottieIcon
      animationData={businessAnalyticsAnimation}
      boxProps={{
        w: { base: "200px", md: "250px" },
        aspectRatio: 1800 / 1578,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка бизнес-аналитики"
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

export default BusinessAnalyticsIcon;


