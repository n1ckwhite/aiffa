import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import ContributionInvite from 'widgets/Lessons/ContributionInvite';
import { Header } from './parts/Header';
import { LessonsGrid } from './parts/LessonsGrid';
import type { ModuleLessonsViewProps } from '../../types';
import { useModuleLessonsViewData } from './data';

export const ModuleLessonsView: React.FC<ModuleLessonsViewProps> = ({ mod, profileSolvedTaskIds, currentPage, getPageHref }) => {
  const { colors } = useModuleLessonsViewData(mod?.id);

  if (!mod) return (<Box pb="32px" />);

  return (
    <Box pb="32px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <Box>
        <VStack
          align="stretch"
          gap={7}
          w="full"
          minW={0}
          maxW={{ base: '100%', md: '900px' }}
          mx="auto"
        >
          <Header mod={mod} colors={colors} />
          <LessonsGrid
            mod={mod}
            colors={colors}
            solvedMap={profileSolvedTaskIds || {}}
            currentPage={currentPage}
            getPageHref={getPageHref}
          />
        </VStack>
      </Box>
    </Box>
  );
};


