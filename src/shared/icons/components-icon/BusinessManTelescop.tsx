"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessManTelescopAnimation from "@/shared/icons/json-icons/businessman-telescop.json";
import businessManTelescopIcon from "@/shared/icons/webp-icons/businessman-telescop.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const BusinessManTelescop: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={businessManTelescopAnimation}
      boxProps={{
        w: { base: "250px", md: "300px" },
        aspectRatio: 1012 / 832,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={businessManTelescopIcon}
          alt="Иконка команды бизнеса"
          width={300}
          height={231}
          sizes="350px"
          priority
        />
      }
    />
  );
};

export default BusinessManTelescop;


