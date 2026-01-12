import React from 'react';
import { Box, HStack, Icon, Text, Tooltip, VStack, useColorModeValue } from '@chakra-ui/react';
import { FaCircleInfo } from 'react-icons/fa6';
import { useAchievementsGridColors } from '../../../colors';
import { achievementDescriptions } from '../../../model/data';
import type { AchievementBadgeProps } from './types';

const FaCircleInfoElement = FaCircleInfo as unknown as React.ElementType;

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ item }) => {
  const {
     labelColor,
      mutedLabelColor,
      cardBg,
      cardBorder,
      hoverBg,
      activeBg,
      ringInnerBg 
    } = useAchievementsGridColors();
  const description = item.desc || achievementDescriptions[item.id] || 'Откройте за активность на платформе';

  return (
    <Box as="li" listStyleType="none" minW={0}>
      <Tooltip
        hasArrow
        openDelay={220}
        placement="top"
        label={
          <HStack spacing={2} maxW="220px">
            <Icon as={FaCircleInfoElement} />
            <Text fontSize="xs">{description}</Text>
          </HStack>
        }
      >
        <Box
          as="button"
          type="button"
          aria-label={`${item.label}${item.achieved ? " — получено" : ""}`}
          aria-disabled={!item.achieved}
          tabIndex={item.achieved ? 0 : -1}
          w="full"
          minW={0}
          minH={{ base: "96px", sm: "104px" }}
          px={{ base: 4, sm: 5 }}
          py={{ base: 3.5, sm: 4 }}
          borderRadius={{ base: "16px", md: "18px" }}
          borderWidth="1px"
          borderColor={cardBorder}
          bg={cardBg}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={{ base: 3, sm: 4 }}
          textAlign="left"
          outline="none"
          transition="transform 160ms ease, background-color 160ms ease"
          _hover={{ bg: hoverBg, transform: "translateY(-1px)" }}
          _active={{ bg: activeBg, transform: "translateY(0px)" }}
        >
          <Box
            h={{ base: "56px", sm: "60px" }}
            w={{ base: "56px", sm: "60px" }}
            borderRadius="full"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Box
              position="absolute"
              inset={0}
              borderRadius="full"
              bg={`conic-gradient(${item.from} 0 50%, ${item.to} 50% 100%)`}
              opacity={item.achieved ? 1 : 0.4}
            />
            <Box
              position="absolute"
              inset="6px"
              borderRadius="full"
              bg={ringInnerBg}
              borderWidth="1px"
              borderColor={item.color}
              opacity={item.achieved ? 1 : 0.5}
            />
            <Box
              position="relative"
              w={{ base: "32px", sm: "34px" }}
              h={{ base: "32px", sm: "34px" }}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="14px"
              bgGradient={`linear(to-br, ${item.from}, ${item.to})`}
              color="white"
              opacity={item.achieved ? 1 : 0.65}
            >
              {React.createElement(item.icon)}
            </Box>
          </Box>

          <VStack align="start" spacing={1} minW={0} flex={1}>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="semibold"
              noOfLines={2}
              color={item.achieved ? labelColor : mutedLabelColor}
              opacity={item.achieved ? 1 : 0.9}
            >
              {item.label}
            </Text>
            <Text
              fontSize="xs"
              color={mutedLabelColor}
              opacity={item.achieved ? 0.9 : 0.75}
              noOfLines={1}
            >
              {description}
            </Text>
          </VStack>
        </Box>
      </Tooltip>
    </Box>
  );
};


