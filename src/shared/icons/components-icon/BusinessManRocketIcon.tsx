"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import businessManRocketAnimation from "@/shared/icons/json-icons/businessman-rocket.json";

const BusinessManRocketIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={businessManRocketAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto" }}
    />
  );
};

export default BusinessManRocketIcon;

