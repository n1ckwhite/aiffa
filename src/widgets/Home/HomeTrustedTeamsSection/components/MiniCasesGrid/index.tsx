import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import type { MiniCasesGridProps } from "./types";
import MiniCaseCard from "../MiniCaseCard";

const MiniCasesGrid: React.FC<MiniCasesGridProps> = ({
  items,
  isDark,
  borderColor,
  borderHoverColor,
  cardBg,
  baseShadow,
  hoverShadow,
  labelColor,
  titleColor,
  textColor,
  actionColor,
  prefersReducedMotion,
}) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 5 }}>
    {items.map((item) => (
      <MiniCaseCard
        key={item.id}
        item={item}
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
    ))}
  </SimpleGrid>
);

export default MiniCasesGrid;
