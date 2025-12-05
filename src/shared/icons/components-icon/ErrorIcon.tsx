"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import errorIcon from "@/shared/icons/webp-icons/error-icon.webp";
import errorAnimation from "@/shared/icons/json-icons/404.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const ErrorIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={errorAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 591 / 420,
        mx: "auto",
        mb: 4,
      }}
      fallback={
        <OptimizedIconImage
          src={errorIcon}
          alt="Иконка ошибки"
          width={350}
          height={250}
          sizes="350px"
          priority
        />
      }
    />
  );
};

export default ErrorIcon;

