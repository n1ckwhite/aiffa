"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import errorAnimation from "@/shared/icons/json-icons/404.json";

const ErrorIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={errorAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto", mb: 4 }}
    />
  );
};

export default ErrorIcon;

