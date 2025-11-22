import React from 'react';
import { VStack, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import type { StudyCardProps } from '../../types/StudyCard.types';

const Body: React.FC<Pick<StudyCardProps, 'studyProgressPct' | 'ringTrack' | 'ringColor'>> = ({
  studyProgressPct,
  ringTrack,
  ringColor,
}) => {
  const clampedProgress = Number.isFinite(studyProgressPct)
    ? Math.max(0, Math.min(100, Math.round(studyProgressPct)))
    : 0;

  return (
    <VStack spacing={2} align="center" minH={{ base: '110px', md: '130px' }}>
      <CircularProgress
        aria-label={`Изучение: ${clampedProgress}%`}
        value={clampedProgress}
        size={{ base: '96px', md: '108px' }}
        thickness="8px"
        trackColor={ringTrack}
        color={ringColor}
      >
        <CircularProgressLabel fontWeight="bold">
          {clampedProgress}
          %
        </CircularProgressLabel>
      </CircularProgress>
    </VStack>
  );
};

export default Body;


