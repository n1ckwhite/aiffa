"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import sessionsIcon from "@/shared/icons/webp-icons/sessions-icon.webp";
import sessionsAnimation from "@/shared/icons/json-icons/sessions.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const SessionsLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={sessionsAnimation}
      boxProps={{
        w: { base: "220px", md: "300px" },
        aspectRatio: 750 / 500,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={sessionsIcon}
          alt="Иконка сессий"
          width={300}
          height={200}
          sizes="(max-width: 768px) 70vw, 300px"
          priority
        />
      }
    />
  );
};

export default SessionsLottieIcon;


