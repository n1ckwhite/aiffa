"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/components-icon/LazyLottieIcon";
import studentIcon from "@/shared/icons/webp-icons/student-icon.webp";
import studentAnimation from "@/shared/icons/json-icons/student.json";
import OptimizedIconImage from "@/shared/icons/components-icon/OptimizedIconImage";

const StudentIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={studentAnimation}
      boxProps={{
        w: { base: "150px", md: "150px" },
        aspectRatio: 1080 / 950,
        mx: "auto",
      }}
      fallback={
        <OptimizedIconImage
          src={studentIcon}
          alt="Иконка студента"
          width={150}
          height={132}
          sizes="150px"
        />
      }
    />
  );
};

export default StudentIcon;

