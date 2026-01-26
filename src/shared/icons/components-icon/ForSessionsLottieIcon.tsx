"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import forSessionsIcon from "@/shared/icons/webp-icons/for-sessions-icon.webp";
import forSessionsAnimation from "shared/icons/json-icons/for-sessions.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const ForSessionsLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={forSessionsAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 600 / 500,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={forSessionsIcon}
          alt="Иконка форм сессий"
          width={438}
          height={224}
          sizes="438px"
          priority
        />
      }
    />
  );
};

export default ForSessionsLottieIcon;


