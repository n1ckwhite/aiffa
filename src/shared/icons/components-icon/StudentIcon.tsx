"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import studentIcon from "@/shared/icons/student-icon.svg";
import studentAnimation from "@/shared/icons/json-icons/student.json";

const StudentIcon: React.FC = () => {
  const raw = studentIcon as any;
  const staticSrc: string =
    (typeof raw === "string" && raw) ||
    (raw && typeof raw.src === "string" && raw.src) ||
    (raw && typeof raw.default === "string" && raw.default) ||
    "";

  return (
    <LazyLottieIcon
      animationData={studentAnimation}
      boxProps={{ w: { base: "150px", md: "150px" }, mx: "auto" }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка студента"
          w="100%"
          h="auto"
          loading="lazy"
        />
      }
    />
  );
};

export default StudentIcon;

