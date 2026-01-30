"use client";

import HeroSection from "@/widgets/HeroSection";
import HomeAdvantagesSection from "@/widgets/HomeAdvantagesSection";
import StartCTASection from "@/widgets/StartCTASection";
import { Box } from "@chakra-ui/react";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <HomeAdvantagesSection />
      <StartCTASection />
    </Box>
  );
};

export default HomePageClient;


