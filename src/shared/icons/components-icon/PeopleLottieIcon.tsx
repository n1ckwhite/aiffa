"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import peopleIcon from "@/shared/icons/svg-icons/people-icon.svg";
import peopleAnimation from "@/shared/icons/json-icons/people.json";

const PeopleLottieIcon: React.FC = () => {
  const raw = peopleIcon as any;
  const staticSrc: string =
    (typeof raw === "string" && raw) ||
    (raw && typeof raw.src === "string" && raw.src) ||
    (raw && typeof raw.default === "string" && raw.default) ||
    "";

  return (
    <LazyLottieIcon
      animationData={peopleAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto", mb: 4 }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка людей"
          w="100%"
          h="auto"
          loading="lazy"
          aria-hidden="true"
        />
      }
    />
  );
};

export default PeopleLottieIcon;

