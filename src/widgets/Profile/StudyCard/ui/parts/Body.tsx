import React from 'react';
import { VStack, Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import type { StudyCardProps } from '../../types/StudyCard.types';

const Body: React.FC<Pick<StudyCardProps, 'isManifestLoaded' | 'studyProgressPct' | 'ringTrack' | 'ringColor' | 'skeletonBg' | 'skeletonRingBorder' | 'skeletonRingTop'>> = ({ isManifestLoaded, studyProgressPct, ringTrack, ringColor, skeletonBg, skeletonRingBorder, skeletonRingTop }) => {
  return (
    <VStack spacing={2} align="center" minH={{ base: '110px', md: '130px' }}>
      {isManifestLoaded ? (
        <CircularProgress aria-label={`Изучение: ${Math.round(studyProgressPct)}%`} value={studyProgressPct} size={{ base: '96px', md: '108px' }} thickness="8px" trackColor={ringTrack} color={ringColor}>
          <CircularProgressLabel fontWeight="bold">{Math.round(studyProgressPct)}%</CircularProgressLabel>
        </CircularProgress>
      ) : (
        <Box role="status" aria-label="Загрузка прогресса обучения" display="flex" alignItems="center" justifyContent="center" w={{ base: '96px', md: '108px' }} h={{ base: '96px', md: '108px' }} borderRadius="full" bg={skeletonBg}>
          <Box w="70%" h="70%" borderRadius="full" borderWidth="6px" borderColor={skeletonRingBorder} borderTopColor={skeletonRingTop} />
        </Box>
      )}
    </VStack>
  );
};

export default Body;


