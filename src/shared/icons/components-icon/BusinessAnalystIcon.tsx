"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessAnalystIcon from "@/shared/icons/webp-icons/business-analyst-icon.webp";
import businessAnalystAnimation from "@/shared/icons/json-icons/business-analyst.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const BusinessAnalystIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={businessAnalystAnimation}
      deferMs={2500}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 1080 / 720,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={businessAnalystIcon}
          alt="Иконка бизнес-аналитика"
          width={350}
          height={233}
          sizes="350px"
          priority
          fetchPriority="high"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain",
          }}
        />
      }
    />
  );
};

export default BusinessAnalystIcon;


