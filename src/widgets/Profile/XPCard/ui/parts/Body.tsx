import React from 'react';
import { VStack, Text, Box, HStack, Badge, Icon } from '@chakra-ui/react';
import { burst } from '../../animations/burst';
import type { XPCardProps } from '../../types/XPCard.types';

const Body: React.FC<Pick<XPCardProps, 'xp' | 'tier' | 'tierBadge' | 'nextTierBadge' | 'progressPct' | 'xpBursts'>> = ({ xp, tier, tierBadge, nextTierBadge, progressPct, xpBursts }) => {
  return (
    <VStack spacing={2} align="stretch" minH={{ base: '110px', md: '130px' }}>
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="extrabold" textAlign="center">{xp} XP</Text>
      <Box w="100%" h="12px" borderRadius="full" bg="rgba(59,130,246,0.14)" position="relative" overflow="hidden">
        <Box position="absolute" top={0} left={0} h="100%" w={`${progressPct}%`} bg="blue.400" borderRadius="full" transition="width 800ms ease" />
        {xpBursts.map((b) => (
          <Box key={b.id} position="absolute" top={-6} left={`calc(${b.leftPct}% - 18px)`} sx={{ animation: `${burst} 600ms ease` }} px={2.5} py={0.5} borderRadius="full" bg="blackAlpha.700" color="white" fontSize="xs" pointerEvents="none">+{b.amount} XP</Box>
        ))}
      </Box>
      <HStack w="100%" justify={nextTierBadge ? 'space-between' : 'flex-start'} spacing={2}>
        <Badge variant="outline" colorScheme={tierBadge.colorScheme as any} borderRadius="full" px={2.5} py={0.5} display="inline-flex" alignItems="center" gap={1} fontSize="xs">
          <Icon as={tierBadge.icon as unknown as React.ElementType} /> {tier}
        </Badge>
        {nextTierBadge && (
          <Badge variant="outline" colorScheme={nextTierBadge.colorScheme as any} borderRadius="full" px={2.5} py={0.5} display="inline-flex" alignItems="center" gap={1} fontSize="xs">
            <Icon as={nextTierBadge.icon as unknown as React.ElementType} /> {nextTierBadge.label}
          </Badge>
        )}
      </HStack>
    </VStack>
  );
};

export default Body;


