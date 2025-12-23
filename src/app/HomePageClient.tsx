"use client";

import { Box } from "@chakra-ui/react";
import HeroSection from "@/widgets/HeroSection";
import FeaturesSection from "@/widgets/FeaturesSection";
import InteractiveFeaturesSection from "@/widgets/InteractiveFeaturesSection";
import StartCTASection from "@/widgets/StartCTASection";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <FeaturesSection />
      <InteractiveFeaturesSection />
      <StartCTASection />
    </Box>
  );
};

export default HomePageClient;


