import React from "react";
import { Badge, HStack, Icon, Text } from "@chakra-ui/react";
import { BlogArticleCategoryBadgeProps } from "./types";



export const BlogArticleCategoryBadge: React.FC<BlogArticleCategoryBadgeProps> = ({ icon, label, categoryColor }) => {
  return (
    <Badge
      w="fit-content"
      borderRadius="full"
      px={2.5}
      py={1}
      fontSize="11px"
      letterSpacing="0.02em"
      variant="subtle"
      colorScheme="blue"
    >
      <HStack spacing={1.5} align="center">
        <Icon as={icon} aria-hidden="true" boxSize={4} color={categoryColor} />
        <Text as="span" color={categoryColor} fontWeight="semibold" noOfLines={1}>
          {label}
        </Text>
      </HStack>
    </Badge>
  );
};


