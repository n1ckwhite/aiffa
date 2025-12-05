"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import robotAnimation from "@/shared/icons/json-icons/error-robot.json";
import robotIcon from "@/shared/icons/webp-icons/error-robot-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const ErrorLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={robotAnimation}
      boxProps={{
        w: { base: "250px", md: "250px" },
        aspectRatio: 1080 / 1080,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={robotIcon}
          alt="Иконка ошибки"
          width={250}
          height={250}
          sizes="250px"
          priority
        />
      }
    />
  );
};

export default ErrorLottieIcon;


