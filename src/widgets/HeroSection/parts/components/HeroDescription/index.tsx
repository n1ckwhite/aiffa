import React from "react";
import { Text } from "@chakra-ui/react";
import type { HeroDescriptionProps } from "./types";

const HeroDescription: React.FC<HeroDescriptionProps> = ({ descriptionId, description, textColor }) => (
  <Text id={descriptionId} fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="1.7">
    {description}
  </Text>
);

export default HeroDescription;
