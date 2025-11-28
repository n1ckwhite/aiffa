"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import businessAnalystAnimation from '@/shared/icons/json-icons/business-analyst.json';

const BusinessAnalystIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "250px", md: "250px" }}
      mx="auto"
    >
      <Lottie
        animationData={businessAnalystAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default BusinessAnalystIcon;


