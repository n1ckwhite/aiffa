"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessAnalystIcon from "@/shared/icons/business-analyst-icon.svg";
import businessAnalystAnimation from "@/shared/icons/json-icons/business-analyst.json";

const BusinessAnalystIcon: React.FC = () => {
  const raw = businessAnalystIcon as any;
  const staticSrc: string =
    (typeof raw === "string" && raw) ||
    (raw && typeof raw.src === "string" && raw.src) ||
    (raw && typeof raw.default === "string" && raw.default) ||
    "";

  return (
    <LazyLottieIcon
      animationData={businessAnalystAnimation}
      boxProps={{ w: { base: "250px", md: "250px" }, mx: "auto" }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка бизнес-аналитика"
          w="100%"
          h="auto"
          loading="lazy"
          aria-hidden="true"
        />
      }
    />
  );
};

export default BusinessAnalystIcon;


