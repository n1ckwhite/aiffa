"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import rewardsAnimation from "@/shared/icons/json-icons/rewards.json";
import rewardsIcon from "@/shared/icons/webp-icons/rewards-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const SuccessStoriesLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={rewardsAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={rewardsIcon}
          alt="Иконка успешных историй"
          width={250}
          height={250}
          sizes="250px"
          fetchPriority="high"
          priority
        />
      }
    />
  );
};

export default SuccessStoriesLottieIcon;


