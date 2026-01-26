import React from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import type { SectionHeaderProps } from "./types";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  titleId,
  descriptionId,
  titleColor,
  textColor,
}) => (
  <VStack spacing={3} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} maxW="980px" as="header">
    <Heading id={titleId} as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-0.03em" color={titleColor} lineHeight="1.05">
      {title}
    </Heading>
    <Text id={descriptionId} color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="820px">
      {description}
    </Text>
  </VStack>
);

export default SectionHeader;
