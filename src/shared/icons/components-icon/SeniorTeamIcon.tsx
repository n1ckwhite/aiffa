"use client";
import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import seniorTeamAnimation from "@/shared/icons/json-icons/senior-team.json";
import seniorTeamIcon from "@/shared/icons/webp-icons/senior-team.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const SeniorTeamIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={seniorTeamAnimation}
      boxProps={{
        w: { base: "250px", md: "300px" },
        aspectRatio: 1080 / 1080 ,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={seniorTeamIcon}
          alt="Иконка команды seniors"
          sizes="300px"
          width={300}
          height={300}
        />
      }
    />
  );
};

export default SeniorTeamIcon;


