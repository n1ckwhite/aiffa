"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import levelAnimation from "@/shared/icons/json-icons/level.json";
import levelIcon from "@/shared/icons/webp-icons/level-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const LevelLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={levelAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={levelIcon}
          alt="Иконка финансов"
          width={250}
          height={250}
          sizes="250px"
          priority
        />
      }
    />
  );
};

export default LevelLottieIcon;


