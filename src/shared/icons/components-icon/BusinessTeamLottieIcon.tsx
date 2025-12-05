"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessTeamAnimation from "@/shared/icons/json-icons/business-team.json";
import businessTeamIcon from "@/shared/icons/webp-icons/business-team-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const BusinessTeamLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={businessTeamAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 2500 / 1650,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={businessTeamIcon}
          alt="Иконка команды бизнеса"
          width={350}
          height={231}
          sizes="(max-width: 768px) 80vw, 350px"
          priority
        />
      }
    />
  );
};

export default BusinessTeamLottieIcon;


