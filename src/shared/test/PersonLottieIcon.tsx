"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import legoAnimation from "shared/test/person.json";

const PersonLottieIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "250px", md: "350px" }}
      mx="auto"
    >
      <Lottie
        animationData={legoAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default PersonLottieIcon;


