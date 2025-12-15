import React from "react";
import { VStack } from "@chakra-ui/react";
import type { CreatorCardMetaProps } from "./types";

const CreatorCardMeta: React.FC<CreatorCardMetaProps> = ({ metaByMode, mode, metaColor }) => (
  <VStack spacing={1} fontSize="xs" color={metaColor} w="full" align="flex-start">
    {metaByMode[mode]}
  </VStack>
);

export default CreatorCardMeta;


