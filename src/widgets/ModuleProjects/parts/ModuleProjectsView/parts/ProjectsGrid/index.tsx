import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import type { ProjectsGridProps } from './types';
import { ProjectGridCard } from './ProjectGridCard';

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ modId, projects, colors }) => {
  if (projects.length === 0) {
    return (
      <Box borderWidth="2px" borderColor={colors.borderColor} bg={colors.cardBg} p={5} borderRadius="xl">
        <Text color={colors.descColor}>Проектов пока нет.</Text>
      </Box>
    );
  }
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} w="full" minW={0}>
      {projects.map((p) => (
        <ProjectGridCard key={p.id} modId={modId} project={p} colors={colors} />
      ))}
    </SimpleGrid>
  );
};


