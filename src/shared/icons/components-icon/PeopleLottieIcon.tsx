"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import peopleIcon from "@/shared/icons/svg-icons/people-icon.svg";
import peopleAnimation from "@/shared/icons/json-icons/people.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const PeopleLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(peopleIcon as any);
  return (
    <LazyLottieIcon
      animationData={peopleAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 1600 / 820,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка людей"
          w="100%"
          h="100%"
          objectFit="contain"
          loading="lazy"
          aria-hidden="true"
        />
      }
    />
  );
};

export default PeopleLottieIcon;

