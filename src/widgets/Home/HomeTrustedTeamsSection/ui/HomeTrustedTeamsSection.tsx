"use client";

import React from "react";
import { Box, Container, VStack, usePrefersReducedMotion } from "@chakra-ui/react";
import { miniCases } from "../data/miniCases";
import { trustedTeamsContent } from "../data/content";
import { useHomeTrustedTeamsColors } from "../colors";
import SectionHeader from "../components/SectionHeader";
import FeaturePanel from "../components/FeaturePanel";
import MiniCasesGrid from "../components/MiniCasesGrid";
import ContributionCta from "../components/ContributionCta";

const HomeTrustedTeamsSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    isDark,
    titleColor,
    textColor,
    cardBg,
    borderColor,
    borderHoverColor,
    baseShadow,
    hoverShadow,
    storyLinkColor,
    ctaBg,
    labelColor,
    actionColor,
    quoteMarkColor,
  } = useHomeTrustedTeamsColors();
  const { header, featurePanel, contribution } = trustedTeamsContent;

  return (
    <Box as="section" px={0} aria-labelledby="home-trusted-title" aria-describedby="home-trusted-desc" pt={{ base: 10, md: 14 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <SectionHeader
            title={header.title}
            description={header.description}
            titleId="home-trusted-title"
            descriptionId="home-trusted-desc"
            titleColor={titleColor}
            textColor={textColor}
          />

          <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="3xl"
            bg={cardBg}
            boxShadow={baseShadow}
            overflow="hidden"
            p={{ base: 5, md: 7 }}
          >
            <FeaturePanel
              title={featurePanel.title}
              quote={featurePanel.quote}
              bullets={featurePanel.bullets}
              titleColor={titleColor}
              textColor={textColor}
              labelColor={labelColor}
              quoteMarkColor={quoteMarkColor}
            />
          </Box>

          <MiniCasesGrid
            items={miniCases}
            isDark={isDark}
            borderColor={borderColor}
            borderHoverColor={borderHoverColor}
            cardBg={cardBg}
            baseShadow={baseShadow}
            hoverShadow={hoverShadow}
            labelColor={labelColor}
            titleColor={titleColor}
            textColor={textColor}
            actionColor={actionColor}
            prefersReducedMotion={prefersReducedMotion}
          />

          <ContributionCta
            title={contribution.title}
            label={contribution.label}
            description={contribution.description}
            linkLabel={contribution.linkLabel}
            linkTo={contribution.linkTo}
            textColor={textColor}
            titleColor={titleColor}
            storyLinkColor={storyLinkColor}
            ctaBg={ctaBg}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeTrustedTeamsSection;

