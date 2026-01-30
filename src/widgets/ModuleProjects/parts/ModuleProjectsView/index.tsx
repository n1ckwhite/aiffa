import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { ModuleProjectsViewProps } from '../../types';
import { useModuleLevel } from 'widgets/ModuleLessons/hooks/useModuleLevel';
import ContributionInvite from 'widgets/Lessons/ContributionInvite';
import { useModuleProjectsColors } from '../../colors';
import { useProjects } from '../../hooks/useProjects';
import { HeaderCard } from './parts/HeaderCard';
import { ProjectsGrid } from './parts/ProjectsGrid';
import { PaginationBar } from './parts/PaginationBar';
import { getPaginationState } from './helpers/pagination';

export const ModuleProjectsView: React.FC<ModuleProjectsViewProps> = ({ mod, currentPage, getPageHref }) => {
  const colors = useModuleProjectsColors();
  const { levelLabel } = useModuleLevel(mod?.id);
  const { projects, projectsCount, projectsLabel } = useProjects(mod);
  const isUrlPagination = typeof getPageHref === 'function';

  const { totalPages, page, start, end, canPrev, canNext, pageItems } = React.useMemo(
    () => getPaginationState(projects.length, currentPage),
    [projects.length, currentPage],
  );
  const visible = projects.slice(start, end);

  if (!mod) return (<Box pb="32px" />);

  return (
    <Box pb="32px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <Box px={0}>
        <VStack align="stretch" gap={7} w="full" minW={0} maxW={{ base: '100%', md: '900px' }} mx="auto">
          <HeaderCard mod={mod} projectsCount={projectsCount} projectsLabel={projectsLabel} levelLabel={levelLabel} colors={colors as any} />
          <ProjectsGrid modId={mod.id} projects={visible as any} colors={colors as any} />
          {totalPages > 1 && isUrlPagination && (
            <PaginationBar
              pageItems={pageItems}
              page={page}
              canPrev={canPrev}
              canNext={canNext}
              getPageHref={getPageHref}
              colors={colors as any}
            />
          )}
        </VStack>
      </Box>
    </Box>
  );
};


