import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { StudyCardProps } from '../types/StudyCard.types';
import { Header, Body, FooterCTA } from './parts';

const StudyCard: React.FC<StudyCardProps> = ({ isManifestLoaded, studyProgressPct, ringTrack, ringColor, skeletonBg, skeletonRingBorder, skeletonRingTop, dividerColor, hintColor }) => {
  return (
    <Box bg="transparent" borderRadius="2xl" p={{ base: 3, md: 4 }} h="100%" display="flex" flexDirection="column">
      <VStack spacing={4} align="stretch">
        <Header />
        <Body isManifestLoaded={isManifestLoaded} studyProgressPct={studyProgressPct} ringTrack={ringTrack} ringColor={ringColor} skeletonBg={skeletonBg} skeletonRingBorder={skeletonRingBorder} skeletonRingTop={skeletonRingTop} />
        <FooterCTA dividerColor={dividerColor} hintColor={hintColor} />
      </VStack>
    </Box>
  );
};

export default StudyCard;


