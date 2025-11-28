"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import lottieAnimation from "@/shared/icons/json-icons/lottie.json";

const LottieHeroIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={lottieAnimation}
      boxProps={{ w: { base: "100px", md: "100px" }, mx: "auto" }}
    />
  );
};

export default LottieHeroIcon;

