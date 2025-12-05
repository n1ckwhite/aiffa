"use client";
import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessWorkshopAnimation from "@/shared/icons/json-icons/business-workshop.json";
import businessWorkShopIcon from "@/shared/icons/webp-icons/business-workshop.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const BusinessWorkshopIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={businessWorkshopAnimation}
      boxProps={{
        w: { base: "200px", md: "250px" },
        aspectRatio: 1080 / 1080,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={businessWorkShopIcon}
          alt="Иконка бизнес-мастерской"
          width={250}
          height={250}
          sizes="250px"
        />
      }
    />
  );
};

export default BusinessWorkshopIcon;


