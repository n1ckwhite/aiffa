"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import codingAnimation from "@/shared/icons/json-icons/coding.json";

const CodingIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={codingAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto" }}
    />
  );
};

export default CodingIcon;

