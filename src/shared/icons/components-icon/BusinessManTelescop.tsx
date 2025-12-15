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
        w: { base: "200px", md: "300px" },
        aspectRatio: 1012 / 832,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          width={1012}
          height={832}
          style={{ width: "100%", height: "auto", aspectRatio: "1012 / 832", objectFit: "contain", display: "block" }}
          src={businessManTelescopIcon}
          alt="Иконка команды бизнеса"
          sizes="(max-width: 768px) 90vw, 320px"
          priority
        />
      }
    />
  );
};

export default BusinessManTelescop;


