import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import HeroSection from "../../ui/parts/HeroSection";
import CreatorsGridSection from "../../ui/parts/CreatorsGridSection";
import TimeRangeSection from "../../ui/parts/TimeRangeSection";
import ContributionSection from "../../ui/parts/ContributionSection";

const CreatorsScreen: React.FC = () => {
  return (
    <Box
      as="main"
      role="main"
      aria-label="Создатели AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      transition="none"
    >
      <Box maxW="1200px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <HeroSection />
          <CreatorsGridSection />
          <TimeRangeSection />
          <ContributionSection />
        </VStack>
      </Box>
    </Box>
  );
};

export default CreatorsScreen;


