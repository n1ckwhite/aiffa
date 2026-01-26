"use client";

import React from "react";
import { Box, Container, VStack, usePrefersReducedMotion } from "@chakra-ui/react";
import { useHowItWorksColors } from "../colors";
import { howItWorksSteps } from "../data/steps";
import StepsHeader from "../components/StepsHeader";
import StepsGrid from "../components/StepsGrid";

const HomeHowItWorksSection: React.FC = () => {
  const {
    borderColor,
    borderHoverColor,
    titleColor,
    textColor,
    cardBg,
    cardShadow,
    cardHoverShadow,
    overlineColor,
    accents,
  } = useHowItWorksColors();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Box as="section" px={0} pt={{ base: 10, md: 14 }} aria-labelledby="home-how-title" aria-describedby="home-how-desc">
      <Container maxW="1200px">
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <StepsHeader
            title="Как это работает"
            description="Пять простых шагов, чтобы у тебя был понятный старт и видимый прогресс."
            titleId="home-how-title"
            descriptionId="home-how-desc"
            titleColor={titleColor}
            textColor={textColor}
          />

          <StepsGrid
            steps={howItWorksSteps}
            prefersReducedMotion={prefersReducedMotion}
            borderColor={borderColor}
            borderHoverColor={borderHoverColor}
            cardBg={cardBg}
            cardShadow={cardShadow}
            cardHoverShadow={cardHoverShadow}
            overlineColor={overlineColor}
            titleColor={titleColor}
            textColor={textColor}
            accents={accents}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeHowItWorksSection;

