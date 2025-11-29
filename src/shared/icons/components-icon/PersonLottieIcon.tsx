"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import personIcon from "@/shared/icons/svg-icons/person-icon.svg";
import personAnimation from "@/shared/icons/json-icons/person.json";

const PersonLottieIcon: React.FC = () => {
  const raw = personIcon as any;
  const staticSrc: string =
    (typeof raw === "string" && raw) ||
    (raw && typeof raw.src === "string" && raw.src) ||
    (raw && typeof raw.default === "string" && raw.default) ||
    "";

  return (
    <LazyLottieIcon
      animationData={personAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto" }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка человека"
          w="100%"
          h="auto"
          loading="lazy"
        />
      }
    />
  );
};

export default PersonLottieIcon;

