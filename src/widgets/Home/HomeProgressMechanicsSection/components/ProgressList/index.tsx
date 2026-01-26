import React from "react";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import type { ProgressListProps } from "./types";

const ProgressList: React.FC<ProgressListProps> = ({ items, isDark, titleColor, textColor }) => (
  <Stack as="ul" m={0} p={0} listStyleType="none" spacing={4} w="full">
    {items.map((item) => (
      <HStack key={item.id} spacing={4} align="flex-start" as="li">
        <Box
          w="44px"
          h="44px"
          borderRadius="xl"
          bg={isDark ? item.accent.bgDark : item.accent.bgLight}
          color={isDark ? item.accent.fgDark : item.accent.fgLight}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={item.icon} boxSize={5} aria-hidden="true" />
        </Box>
        <Box>
          <Text fontWeight="bold" color={titleColor}>
            {item.title}
          </Text>
          <Text fontSize="sm" color={textColor} lineHeight="1.7">
            {item.desc}
          </Text>
        </Box>
      </HStack>
    ))}
  </Stack>
);

export default ProgressList;
