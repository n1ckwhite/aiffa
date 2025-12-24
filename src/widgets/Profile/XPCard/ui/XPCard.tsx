import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { XPCardProps } from '../types/XPCard.types';
import { Header, Body, FooterCTA } from './parts';

const XPCard: React.FC<XPCardProps> = ({ xp, tier, tierBadge, nextTierBadge, progressPct, xpBursts, dividerColor, hintColor }) => {
  return (
    <Box bg="transparent" borderRadius="2xl" p={{ base: 3, md: 4 }} h="100%" display="flex" flexDirection="column" w="full" minW={0}>
      <VStack align="stretch" spacing={4} w="full" minW={0}>
        <Header />
        <Body xp={xp} tier={tier} tierBadge={tierBadge} nextTierBadge={nextTierBadge} progressPct={progressPct} xpBursts={xpBursts} />
        <FooterCTA dividerColor={dividerColor} hintColor={hintColor} />
      </VStack>
    </Box>
  );
};

export default XPCard;


