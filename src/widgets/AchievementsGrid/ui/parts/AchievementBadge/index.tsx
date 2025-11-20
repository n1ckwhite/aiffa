import React from 'react';
import { Box, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaCircleInfo } from 'react-icons/fa6';
import { pulse } from '../../../animations/pulse';
import { useAchievementsGridColors } from '../../../colors';
import { achievementDescriptions } from '../../../model/data';
import type { AchievementBadgeProps } from './types';

const FaCircleInfoElement = FaCircleInfo as unknown as React.ElementType;

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ item, index }) => {
  const { achievedBg, labelColor, mutedLabelColor } = useAchievementsGridColors();
  const description = item.desc || achievementDescriptions[item.id] || 'Откройте за активность на платформе';

  return (
    <VStack spacing={1} w={{ base: '88px', sm: '100px', md: '110px' }}>
      <Tooltip hasArrow openDelay={220} placement="top" label={
        <HStack spacing={2} maxW="200px">
          <Icon as={FaCircleInfoElement} />
          <Text fontSize="xs">{description}</Text>
        </HStack>
      }>
        <Box
          as="button"
          type="button"
          aria-label={`${item.label}${item.achieved ? ' — получено' : ''}`}
          aria-disabled={!item.achieved}
          tabIndex={item.achieved ? 0 : -1}
          h={{ base: '50px', sm: '54px' }}
          w={{ base: '50px', sm: '54px' }}
          borderRadius="full"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="transform 160ms ease, box-shadow 200ms ease, background-color 200ms ease"
          _hover={{ transform: 'translateY(-1px)' }}
          sx={item.achieved ? { animation: `${pulse} 1400ms ${index*60}ms ease-out both` } : { filter: 'grayscale(0.6) brightness(0.85)' }}
        >
          <Box position="absolute" inset={0} borderRadius="full" bg={`conic-gradient(${item.from} 0 50%, ${item.to} 50% 100%)`} opacity={item.achieved ? 1 : 0.4} />
          <Box position="absolute" inset="5px" borderRadius="full" bg={achievedBg} borderWidth="1px" borderColor={item.color} opacity={item.achieved ? 1 : 0.5} />
          <Box
            position="relative"
            w={{ base: '26px', sm: '28px' }}
            h={{ base: '26px', sm: '28px' }}
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
      </Tooltip>
      <Text fontSize={{ base: '10px', sm: '11px' }} textAlign="center" noOfLines={2} color={item.achieved ? labelColor : mutedLabelColor} opacity={item.achieved ? 1 : 0.9}>
        {item.label}
      </Text>
    </VStack>
  );
};


