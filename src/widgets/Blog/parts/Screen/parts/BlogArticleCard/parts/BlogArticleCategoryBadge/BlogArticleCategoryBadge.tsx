import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { BlogArticleCategoryBadgeProps } from "./types";



export const BlogArticleCategoryBadge: React.FC<BlogArticleCategoryBadgeProps> = ({ icon, label, categoryColor }) => {
  return (
    <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
      <HStack spacing={1.5} align="center">
        <Icon as={icon} aria-hidden="true" boxSize={4} color={categoryColor} />
        <Text as="span" color={categoryColor} fontWeight="semibold" noOfLines={1}>
          {label}
        </Text>
      </HStack>
    </PillBadge>
  );
};


