import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import type { ProgressHeaderProps } from "./types";

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  overline,
  title,
  description,
  titleId,
  descriptionId,
  titleColor,
  textColor,
  accentLabel,
}) => (
  <VStack spacing={2} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} w="full" flex="1 1 auto" as="header">
    <Text fontSize={{ base: "sm", md: "sm" }} fontWeight="bold" color={accentLabel} letterSpacing="0.16em" textTransform="uppercase">
      {overline}
    </Text>
    <Text id={titleId} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
      {title}
    </Text>
    <Text id={descriptionId} color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
      {description}
    </Text>
  </VStack>
);

export default ProgressHeader;
