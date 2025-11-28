"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import lottieAnimation from '@/shared/icons/json-icons/lottie.json';

const LottieHeroIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "120px", md: "120px" }}
      mx="auto"
    >
      <Lottie
        animationData={lottieAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default LottieHeroIcon;


