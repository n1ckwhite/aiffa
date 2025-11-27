"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import legoAnimation from "shared/test/lottie.json";

const LottieHeroIcon: React.FC = () => {
  return (
    <Box
      aria-hidden="true"
      w={{ base: "140px", md: "180px" }}
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

export default LottieHeroIcon;


