"use client";
import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import businessWorkshopAnimation from "@/shared/icons/json-icons/business-workshop.json";
import businessWorkShopIcon from "@/shared/icons/webp-icons/business-workshop.webp";

const BusinessWorkshopIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(businessWorkShopIcon as any);
  return (
    <LazyLottieIcon
      animationData={businessWorkshopAnimation}
      boxProps={{
        w: { base: "200px", md: "250px" },
        aspectRatio: 1080 / 1080,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка бизнес-мастерской"
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

export default BusinessWorkshopIcon;


