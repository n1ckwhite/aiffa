"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import personIcon from "@/shared/icons/webp-icons/person-icon.webp";
import personAnimation from "@/shared/icons/json-icons/person.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const PersonLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(personIcon as any);
  return (
    <LazyLottieIcon
      animationData={personAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 1330 / 920,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка человека"
          w="100%"
          h="100%"
          objectFit="contain"
          loading="lazy"
        />
      }
    />
  );
};

export default PersonLottieIcon;

