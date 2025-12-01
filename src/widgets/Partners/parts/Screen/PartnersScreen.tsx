import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import HeroSection from "../HeroSection/HeroSection";
import OverviewSection from "../OverviewSection/OverviewSection";
import EarlyAccessSection from "../EarlyAccessSection/EarlyAccessSection";
import BrandFitSection from "../BrandFitSection/BrandFitSection";
import FormatsSection from "../FormatsSection/FormatsSection";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";
import FaqSection from "../FaqSection/FaqSection";

const PartnersScreen: React.FC = () => {
  return (
    <Box
      as="main"
      role="main"
      aria-label="Партнёрство и спонсорство AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      transition="none"
    >
      <Box maxW="1200px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <HeroSection />
          <OverviewSection />
          <EarlyAccessSection />
          <BrandFitSection />
          <FormatsSection />
          <HowItWorksSection />
          <FaqSection />
        </VStack>
      </Box>
    </Box>
  );
};

export default PartnersScreen;


