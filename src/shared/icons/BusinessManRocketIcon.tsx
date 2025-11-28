"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import businessManRocketAnimation from '@/shared/icons/json-icons/businessman-rocket.json';

const BusinessManRocketIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "250px", md: "350px" }}
      mx="auto"
    >
      <Lottie
        animationData={businessManRocketAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default BusinessManRocketIcon;


