import React from "react";
import { Text } from "@chakra-ui/react";
import type { CreatorCardDescriptionProps } from "./types";

const CreatorCardDescription: React.FC<CreatorCardDescriptionProps> = ({ description, color }) => (
  <Text fontSize="xs" fontWeight="medium" color={color} textAlign="left" whiteSpace="normal" wordBreak="break-word" mb={3}>
    {description}
  </Text>
);

export default CreatorCardDescription;


