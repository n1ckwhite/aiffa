"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import studentAnimation from "@/shared/icons/json-icons/student.json";

const StudentIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={studentAnimation}
      boxProps={{ w: { base: "150px", md: "150px" }, mx: "auto" }}
    />
  );
};

export default StudentIcon;

