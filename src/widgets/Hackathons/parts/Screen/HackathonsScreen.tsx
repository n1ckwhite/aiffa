import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import HackathonsHeroSection from "../HeroSection/HackathonsHeroSection";
import HackathonsOverviewSection from "../OverviewSection/HackathonsOverviewSection";
import HackathonsNextHackathonSection from "../NextHackathonSection/HackathonsNextHackathonSection";
import HackathonsCommunityGrowthSection from "../CommunityGrowthSection/HackathonsCommunityGrowthSection";
import HackathonsHowItWorksSection from "../HowItWorksSection/HackathonsHowItWorksSection";
import HackathonsPrizeSection from "../PrizeSection/HackathonsPrizeSection";
import HackathonsFaqSection from "../FaqSection/HackathonsFaqSection";
import HackathonsSubmissionSection from "../SubmissionSection/HackathonsSubmissionSection";
import HackathonsRulesSection from "../RulesSection/HackathonsRulesSection";
import HackathonsFinalCtaSection from "../FinalCtaSection/HackathonsFinalCtaSection";

const HackathonsScreen: React.FC = () => {
  return (
    <Box
      as="main"
      role="main"
      aria-label="Хакатоны AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      transition="none"
    >
      <Box maxW="1200px" mx="auto" w="full" minW={0}>
        <VStack align="stretch" spacing={{ base: 10, md: 14 }} w="full" minW={0}>
          <HackathonsNextHackathonSection />
          <HackathonsPrizeSection />
          <HackathonsHeroSection />
          <HackathonsOverviewSection />
          <HackathonsCommunityGrowthSection />
          <HackathonsHowItWorksSection />
          <HackathonsSubmissionSection />
          <HackathonsRulesSection />
          <HackathonsFinalCtaSection />
          <HackathonsFaqSection />
        </VStack>
      </Box>
    </Box>
  );
};

export default HackathonsScreen;


