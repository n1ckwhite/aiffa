import React from "react";
import { Box, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import type { HighlightsListProps } from "./types";

const HighlightsList: React.FC<HighlightsListProps> = ({ items, titleColor, textColor, iconColors, iconFallback }) => (
  <SimpleGrid as="ul" columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full" m={0} p={0} listStyleType="none">
    {items.map((item, idx) => (
      <Box as="li" key={item.title} w="full">
        <HStack spacing={3} align="flex-start">
          <Box
            w="36px"
            h="36px"
            borderRadius="lg"
            color={iconColors[idx % iconColors.length] ?? iconFallback}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={item.icon} boxSize={5} aria-hidden />
          </Box>
          <Box>
            <Text fontWeight="bold" color={titleColor} fontSize={{ base: "sm", md: "md" }}>
              {item.title}
            </Text>
            <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.6" mt={1}>
              {item.desc}
            </Text>
          </Box>
        </HStack>
      </Box>
    ))}
  </SimpleGrid>
);

export default HighlightsList;
