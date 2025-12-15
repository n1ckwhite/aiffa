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
    <Box as="main" role="main" aria-labelledby="creators-page-title" py={{ base: 8, md: 10 }} px={{ base: 4, md: 6 }} transition="none">
      <Box maxW="1320px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <CreatorsIntroSection />
          <HeroSection />
          <CreatorsJoinSection />
            <FeaturedCreatorsSection />
            <ProjectsAuthorsSection />
            <WeeklyAuthorsSection />
            <ArticleAuthorsSection />
            <HackathonWinnersSection />
            <SupportersSection />
          <CreatorsSeniorBenefitsSection />
            <FAQ variant="creators" showSupportBlock={false} />
        </VStack>
      </Box>
    </Box>
  );
};

export default CreatorsScreen;
