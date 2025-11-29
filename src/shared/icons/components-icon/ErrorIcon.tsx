"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import errorIcon from "@/shared/icons/error-icon.svg";
import errorAnimation from "@/shared/icons/json-icons/404.json";

const ErrorIcon: React.FC = () => {
  const raw = errorIcon as any;
  const staticSrc: string =
    (typeof raw === "string" && raw) ||
    (raw && typeof raw.src === "string" && raw.src) ||
    (raw && typeof raw.default === "string" && raw.default) ||
    "";

  return (
    <LazyLottieIcon
      animationData={errorAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto", mb: 4 }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка ошибки"
          w="100%"
          h="auto"
          loading="lazy"
          aria-hidden="true"
        />
      }
    />
  );
};

export default ErrorIcon;

