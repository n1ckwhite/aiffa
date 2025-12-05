"use client";
import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessAnalyticsAnimation from "@/shared/icons/json-icons/business-analytics.json";
import businessAnalyticsIcon from "@/shared/icons/webp-icons/business-analystics-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const BusinessAnalyticsIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={businessAnalyticsAnimation}
      boxProps={{
        w: { base: "200px", md: "350px" },
        aspectRatio: 1800 / 1578,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={businessAnalyticsIcon}
          alt="Иконка бизнес-аналитики"
          width={350}
          height={307}
          sizes="350px"
        />
      }
    />
  );
};

export default BusinessAnalyticsIcon;


