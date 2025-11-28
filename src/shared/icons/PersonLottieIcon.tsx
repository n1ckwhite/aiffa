"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import legoAnimation from "@/shared/icons/json-icons/person.json";

const PersonLottieIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={legoAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto" }}
    />
  );
};

export default PersonLottieIcon;

