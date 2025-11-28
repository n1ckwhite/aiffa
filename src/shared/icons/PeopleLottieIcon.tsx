"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import legoAnimation from "@/shared/icons/json-icons/people.json";

const PeopleLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={legoAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto", mb: 4 }}
    />
  );
};

export default PeopleLottieIcon;

