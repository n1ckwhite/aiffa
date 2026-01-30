"use client";

import HeroSection from "@/widgets/HeroSection";
import StartCTASection from "@/widgets/StartCTASection";
import { Box } from "@chakra-ui/react";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <StartCTASection />
    </Box>
  );
};

export default HomePageClient;


