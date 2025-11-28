"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import codingAnimation from '@/shared/icons/json-icons/coding.json';

const CodingIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "250px", md: "350px" }}
      mx="auto"
    >
      <Lottie
        animationData={codingAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default CodingIcon;


