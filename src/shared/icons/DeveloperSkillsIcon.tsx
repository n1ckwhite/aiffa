"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import developerSkillsAnimation from '@/shared/icons/json-icons/developer-skills.json';

const DeveloperSkillsIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "250px", md: "350px" }}
      mx="auto"
    >
      <Lottie
        animationData={developerSkillsAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default DeveloperSkillsIcon;


