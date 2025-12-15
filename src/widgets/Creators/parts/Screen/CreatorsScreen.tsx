import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import FAQ from "widgets/Modules/FAQ/FAQ";
import HeroSection from "../../ui/parts/HeroSection/HeroSection";
import FeaturedCreatorsSection from "../../ui/parts/FeaturedCreatorsSection/FeaturedCreatorsSection";
import ProjectsAuthorsSection from "../../ui/parts/ProjectsAuthorsSection/ProjectsAuthorsSection";
import WeeklyAuthorsSection from "../../ui/parts/WeeklyAuthorsSection/WeeklyAuthorsSection";
import ArticleAuthorsSection from "../../ui/parts/ArticleAuthorsSection";
import HackathonWinnersSection from "../../ui/parts/HackathonWinnersSection/HackathonWinnersSection";
import SupportersSection from "../../ui/parts/SupportersSection/SupportersSection";
import CreatorsIntroSection from "../../ui/parts/CreatorsIntroSection";
import CreatorsJoinSection from "../../ui/parts/CreatorsJoinSection/CreatorsJoinSection";
import CreatorsSeniorBenefitsSection from "../../ui/parts/CreatorsSeniorBenefitsSection/CreatorsSeniorBenefitsSection";

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
      <Box maxW="1320px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <CreatorsIntroSection />
          <HeroSection />
          <CreatorsJoinSection />
          <Box id="materials" scrollMarginTop="90px">
            <FeaturedCreatorsSection />
          </Box>
          <Box id="projects" scrollMarginTop="90px">
            <ProjectsAuthorsSection />
          </Box>
          <Box id="weekly" scrollMarginTop="90px">
            <WeeklyAuthorsSection />
          </Box>
          <Box id="articles" scrollMarginTop="90px">
            <ArticleAuthorsSection />
          </Box>
          <Box id="hackathons" scrollMarginTop="90px">
            <HackathonWinnersSection />
          </Box>
          <Box id="supporters" scrollMarginTop="90px">
            <SupportersSection />
          </Box>
          <CreatorsSeniorBenefitsSection />
          <Box id="faq-creators" scrollMarginTop="90px">
            <FAQ variant="creators" showSupportBlock={false} />
          </Box>
          {/* <CreatorsGridSection /> */}
        </VStack>
      </Box>
    </Box>
  );
};

export default CreatorsScreen;
