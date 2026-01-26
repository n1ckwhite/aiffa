import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { ForSessionsLottieIcon } from "@/shared/icons/components-icon";
import type { StepsHeaderProps } from "./types";

const StepsHeader: React.FC<StepsHeaderProps> = ({
  title,
  description,
  titleId,
  descriptionId,
  titleColor,
  textColor,
}) => (
  <VStack spacing={3} textAlign="center" as="header">
    <Box aria-hidden="true">
      <ForSessionsLottieIcon />
    </Box>
    <Text id={titleId} fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
      {title}
    </Text>
    <Text id={descriptionId} color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="760px" mx="auto">
      {description}
    </Text>
  </VStack>
);

export default StepsHeader;
