"use client";

import React from "react";
import { Image } from "@chakra-ui/react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import studentIcon from "@/shared/icons/webp-icons/student-icon.webp";
import studentAnimation from "@/shared/icons/json-icons/student.json";
import { getStaticSrcFromModule } from "@/shared/icons/components-icon/data/staticSrc";

const StudentIcon: React.FC = () => {
  const staticSrc = getStaticSrcFromModule(studentIcon as any);
  return (
    <LazyLottieIcon
      animationData={studentAnimation}
      boxProps={{
        w: { base: "150px", md: "150px" },
        aspectRatio: 1080 / 950,
        mx: "auto",
      }}
      fallback={
        <Image
          src={staticSrc}
          alt="Иконка студента"
          w="100%"
          h="100%"
          objectFit="contain"
          loading="lazy"
        />
      }
    />
  );
};

export default StudentIcon;

