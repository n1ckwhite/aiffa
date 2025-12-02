"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";
import businessTeamAnimation from "@/shared/icons/json-icons/business-team.json";
import businessTeamIcon from "@/shared/icons/svg-icons/business-team-icon.svg";

const BusinessTeamLottieIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(businessTeamIcon);
  return (
    <LazyLottieIcon
      animationData={businessTeamAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 2500 / 1650,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка команды бизнеса"
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

export default BusinessTeamLottieIcon;


