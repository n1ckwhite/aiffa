"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import partnersAnimation from "@/shared/icons/json-icons/finance.json";
import financeIcon from "@/shared/icons/webp-icons/finance-icon.webp";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const FinanceLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={partnersAnimation}
      boxProps={{
        w: { base: "270px", md: "350px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={financeIcon}
          alt="Иконка финансов"
          width={350}
          height={350}
          sizes="350px"
          priority
        />
      }
    />
  );
};

export default FinanceLottieIcon;


