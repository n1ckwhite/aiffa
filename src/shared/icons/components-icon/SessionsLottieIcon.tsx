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
        w: { base: "250px", md: "350px" },
        aspectRatio: 750 / 500,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={sessionsIcon}
          alt="Иконка сессий"
          width={438}
          height={285}
          sizes="438px"
          priority
          fetchPriority="high"
        />
      }
    />
  );
};

export default SessionsLottieIcon;


