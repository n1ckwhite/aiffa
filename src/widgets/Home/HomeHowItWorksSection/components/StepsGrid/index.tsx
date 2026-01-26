import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import type { StepsGridProps } from "./types";
import StepCard from "../StepCard";

const StepsGrid: React.FC<StepsGridProps> = ({
  steps,
  prefersReducedMotion,
  borderColor,
  borderHoverColor,
  cardBg,
  cardShadow,
  cardHoverShadow,
  overlineColor,
  titleColor,
  textColor,
  accents,
}) => (
  <SimpleGrid
    as="ul"
    minChildWidth={{ base: "100%", md: "320px" }}
    spacing={{ base: 4, md: 5 }}
    m={0}
    p={0}
    listStyleType="none"
  >
    {steps.map((step, index) => {
      const accent = accents[step.accent];
      return (
        <StepCard
          key={step.title}
          step={step}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
          borderColor={borderColor}
          borderHoverColor={borderHoverColor}
          cardBg={cardBg}
          cardShadow={cardShadow}
          cardHoverShadow={cardHoverShadow}
          overlineColor={overlineColor}
          titleColor={titleColor}
          textColor={textColor}
          accentBg={accent.bg}
          accentColor={accent.color}
        />
      );
    })}
  </SimpleGrid>
);

export default StepsGrid;
