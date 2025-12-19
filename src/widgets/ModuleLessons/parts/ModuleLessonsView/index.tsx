import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import ContributionInvite from 'widgets/Lessons/ContributionInvite';
import { Header } from './parts/Header';
import { ProjectLink } from './parts/ProjectLink';
import { LessonsGrid } from './parts/LessonsGrid';
import type { ModuleLessonsViewProps } from '../../types';
import { useModuleLessonsViewData } from './data';
import { arrowAnimCss } from './animations';

export const ModuleLessonsView: React.FC<ModuleLessonsViewProps> = ({ mod, profileSolvedTaskIds, currentPage, getPageHref }) => {
  const { colors, levelAccent } = useModuleLessonsViewData(mod?.id);

  if (!mod) return (<Box pb="32px" />);

  return (
    <Box pb="32px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <Box>
        <VStack align="stretch" gap={7} maxW={{ base: '100%', md: '900px' }} mx="auto">
          <Header mod={mod} colors={colors} />
          <ProjectLink mod={mod} colors={colors} levelAccent={levelAccent} arrowAnimationCss={arrowAnimCss} />
          <LessonsGrid
            mod={mod}
            colors={colors}
            solvedMap={profileSolvedTaskIds || {}}
            currentPage={currentPage}
            getPageHref={getPageHref}
          />
          <ContributionInvite variant="materials" />
        </VStack>
      </Box>
    </Box>
  );
};


