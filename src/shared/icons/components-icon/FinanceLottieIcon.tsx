"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import partnersAnimation from "@/shared/icons/json-icons/finance.json";
import financeIcon from "@/shared/icons/svg-icons/finance-icon.svg";

const FinanceLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(financeIcon as any);
  return (
    <LazyLottieIcon
      animationData={partnersAnimation}
      boxProps={{
        w: { base: "270px", md: "350px" },
        aspectRatio: 1,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка финансов"
          w="100%"
          h="100%"
          objectFit="contain"
          loading="eager"
          fetchPriority="high"
          aria-hidden="true"
        />
      }
    />
  );
};

export default FinanceLottieIcon;


