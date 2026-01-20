"use client";

import { Box } from "@chakra-ui/react";
import HeroSection from "@/widgets/HeroSection";
import HomeEcosystemMapSection from "@/widgets/HomeEcosystemMapSection";
import HomeExamplesShowcaseSection from "@/widgets/HomeExamplesShowcaseSection";
import HomeMockStoriesSection from "@/widgets/HomeMockStoriesSection";
import HomeTestimonialsCarouselSection from "@/widgets/HomeTestimonialsCarouselSection";
import HomeAISection from "@/widgets/HomeAISection";
import HomeGrowthHubSection from "@/widgets/HomeGrowthHubSection";
import HomeTrustHubSection from "@/widgets/HomeTrustHubSection";
import HomeCreatorsPreviewSection from "@/widgets/HomeCreatorsPreviewSection";
import HomeFaqSection from "@/widgets/HomeFaqSection";
import StartCTASection from "@/widgets/StartCTASection";

const HomePageClient = () => {
  return (
    <Box position="relative" overflow="hidden" bg="transparent">
      <HeroSection />
      <HomeEcosystemMapSection />
      <HomeExamplesShowcaseSection />
      <HomeMockStoriesSection />
      <HomeTestimonialsCarouselSection />
      <HomeAISection />
      <HomeGrowthHubSection />
      <HomeTrustHubSection />
      <HomeCreatorsPreviewSection />
      <StartCTASection />
      <HomeFaqSection />
    </Box>
  );
};

export default HomePageClient;


