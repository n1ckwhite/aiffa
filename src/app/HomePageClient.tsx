"use client";

import { Box } from "@chakra-ui/react";
import HeroSection from "@/widgets/HeroSection";
import HomeHowItWorksSection from "@/widgets/HomeHowItWorksSection";
import StartCTASection from "@/widgets/StartCTASection";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <HomeHowItWorksSection />
      <StartCTASection />
    </Box>
  );
};

export default HomePageClient;


