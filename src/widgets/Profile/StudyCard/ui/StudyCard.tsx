import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { StudyCardProps } from '../types/StudyCard.types';
import { Header, Body, FooterCTA } from './parts';

const StudyCard: React.FC<StudyCardProps> = ({
  studyProgressPct,
  ringTrack,
  ringColor,
  dividerColor,
  hintColor,
}) => {
  return (
    <Box
      bg="transparent"
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      h="100%"
      display="flex"
      flexDirection="column"
      w="full"
      minW={0}
    >
      <VStack spacing={4} align="stretch" w="full" minW={0}>
        <Header />
        <Body studyProgressPct={studyProgressPct} ringTrack={ringTrack} ringColor={ringColor} />
        <FooterCTA dividerColor={dividerColor} hintColor={hintColor} />
      </VStack>
    </Box>
  );
};

export default StudyCard;


