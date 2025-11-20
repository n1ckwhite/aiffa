import React from 'react';
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { ProjectHeaderCardProps } from './types';

export const ProjectHeaderCard: React.FC<ProjectHeaderCardProps> = ({ project, borderColor, cardBg, descColor, backToListUrl }) => {
  return (
    <Box bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={{ base: 4, md: 6 }}>
      <Heading size="lg" mb={2}>{project.title}</Heading>
      <Text fontSize="md" color={descColor} mb={4}>
        Итоговый проект закрепляет тему материала на практике. По шагам вы соберёте рабочее решение, оформите репозиторий и PR. После завершения вы увереннее применяете инструменты из модуля и лучше понимаете, что происходит «под капотом».
      </Text>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 3, md: 4 }} align={{ base: 'stretch', sm: 'center' }} pt={1}>
        <Button as={RouterLink} to={backToListUrl} variant="outline" borderRadius="full" w={{ base: '100%', sm: 'auto' }}>
          К списку проектов
        </Button>
      </Stack>
    </Box>
  );
};


