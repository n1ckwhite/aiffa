import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { FiAward, FiExternalLink } from "react-icons/fi";
import type { CreatorCardHeaderProps } from "./types";

const CreatorCardHeader: React.FC<CreatorCardHeaderProps> = ({ isTop3, index, rankBorder, rankBg, rankColor, cardHref, linkColor }) => (
  <HStack justify="space-between" align="center" mb={2} spacing={2}>
    {isTop3 && (
      <HStack spacing={1} px={2} py={0.5} borderRadius="full" borderWidth="1px" borderColor={rankBorder} bg={rankBg} alignItems="center">
        <Icon as={FiAward} boxSize={3.5} aria-hidden="true" color={rankColor} />
        <Text as="span" fontSize="xs" fontWeight="semibold" color={rankColor}>
          #{index}
        </Text>
      </HStack>
    )}
    {cardHref && <Icon as={FiExternalLink} boxSize={3.5} aria-hidden="true" color={linkColor} />}
  </HStack>
);

export default CreatorCardHeader;


