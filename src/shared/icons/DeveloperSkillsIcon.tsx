"use client";

import React from "react";
import LazyLottieIcon from "@/shared/icons/LazyLottieIcon";
import developerSkillsAnimation from "@/shared/icons/json-icons/developer-skills.json";

const DeveloperSkillsIcon: React.FC = () => {
  return (
    <LazyLottieIcon
      animationData={developerSkillsAnimation}
      boxProps={{ w: { base: "250px", md: "350px" }, mx: "auto" }}
    />
  );
};

export default DeveloperSkillsIcon;

