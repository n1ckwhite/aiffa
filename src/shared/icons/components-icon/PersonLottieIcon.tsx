"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import personIcon from "@/shared/icons/webp-icons/person-icon.webp";
import personAnimation from "@/shared/icons/json-icons/person.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const PersonLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={personAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 1330 / 920,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={personIcon}
          alt="Иконка человека"
          width={350}
          height={242}
          sizes="350px"
        />
      }
    />
  );
};

export default PersonLottieIcon;

