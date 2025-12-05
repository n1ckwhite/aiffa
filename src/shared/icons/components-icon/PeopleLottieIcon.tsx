"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import peopleIcon from "@/shared/icons/webp-icons/people-icon.webp";
import peopleAnimation from "@/shared/icons/json-icons/people.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const PeopleLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={peopleAnimation}
      boxProps={{
        w: { base: "250px", md: "350px" },
        aspectRatio: 1600 / 820,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={peopleIcon}
          alt="Иконка людей"
          width={438}
          height={224}
          sizes="438px"
        />
      }
    />
  );
};

export default PeopleLottieIcon;

