"use client";

import HeroSection from "@/widgets/HeroSection";
import HomeBusinessSection from "@/widgets/Home/HomeBusinessSection";
import HomeHowItWorksSection from "@/widgets/Home/HomeHowItWorksSection";
import HomeProgressMechanicsSection from "@/widgets/Home/HomeProgressMechanicsSection";
import HomeTrustedTeamsSection from "@/widgets/Home/HomeTrustedTeamsSection";
import StartCTASection from "@/widgets/StartCTASection";
import { Box } from "@chakra-ui/react";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <HomeHowItWorksSection />
      <HomeTrustedTeamsSection />
      <HomeProgressMechanicsSection />
      <HomeBusinessSection />
      <StartCTASection />
    </Box>
  );
};

export default HomePageClient;


