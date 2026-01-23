"use client";

import { Box } from "@chakra-ui/react";
import HeroSection from "@/widgets/HeroSection";
import HomeHowItWorksSection from "@/widgets/HomeHowItWorksSection";
import HomeTrustedTeamsSection from "@/widgets/HomeTrustedTeamsSection";
import HomeProgressMechanicsSection from "@/widgets/HomeProgressMechanicsSection";
import HomeCommunityChannelsSection from "@/widgets/HomeCommunityChannelsSection";
import StartCTASection from "@/widgets/StartCTASection";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <HomeHowItWorksSection />
      <HomeTrustedTeamsSection />
      <HomeProgressMechanicsSection />
      <HomeCommunityChannelsSection />
      <StartCTASection />
    </Box>
  );
};

export default HomePageClient;


