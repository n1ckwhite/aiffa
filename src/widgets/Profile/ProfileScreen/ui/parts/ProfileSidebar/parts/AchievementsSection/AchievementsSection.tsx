import React from "react";
import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { formatCount } from "shared/functions/formatCount";
import { AppLink } from "shared/ui/AppLink";
import { CompactAchievement } from "../../../CompactAchievement";
import type { AchievementsSectionProps } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievedItems,
}) => {
  const {
    achievementsIconBg,
    achievementsIconColor,
    achievementsCountBg,
    achievementsCardBorder,
  } = useProfileScreenUiColors();
  if (!achievedItems || achievedItems.length === 0) return null;

  return (
    <VStack align="start" spacing={2.5} w="full" textAlign="left" mt={5}>
      <HStack w="full" justify="space-between" align="center">
        <HStack spacing={2} align="center">
          <Box
            aria-hidden="true"
            w="28px"
            h="28px"
            borderRadius="10px"
            bg={achievementsIconBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={achievementsIconColor}
            flexShrink={0}
          >
            <Icon as={FiStar} boxSize="15px" />
          </Box>
          <AppLink
            to="/profile?achievements"
            prefetch={false}
            aria-label="Открыть достижения"
            display="inline-flex"
            w="fit-content"
            maxW="100%"
            textDecoration="none"
            borderBottom="0"
            _hover={{ textDecoration: "underline", borderBottom: "0" }}
            _focusVisible={{ boxShadow: "none", outline: "2px solid", outlineOffset: "2px" }}
          >
            <Text fontWeight="bold" textAlign="left" w="full">
              Достижения
            </Text>
          </AppLink>
        </HStack>

        <Box
          px={2.5}
          py={1}
          borderRadius="full"
          borderWidth="1px"
          borderColor={achievementsCardBorder}
          bg={achievementsCountBg}
        >
          <Text fontSize="xs" fontWeight="bold" color={achievementsIconColor}>
            {formatCount(achievedItems.length)}
          </Text>
        </Box>
      </HStack>

      <Box>
        <HStack spacing={2} flexWrap="wrap" justify="flex-start">
          {achievedItems.map((it: any) => (
            <CompactAchievement key={it.id} item={it} />
          ))}
        </HStack>
      </Box>
    </VStack>
  );
};


