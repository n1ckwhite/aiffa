import React from 'react';
import { Box } from '@chakra-ui/react';
import MarkdownRenderer from 'shared/ui/MarkdownRenderer';
import type { MainColumnProps } from './types';
import { BreadcrumbHeader } from '../BreadcrumbHeader';

export const MainColumn: React.FC<MainColumnProps> = ({
  headerAnchorRef,
  lesson,
  mod,
  md,
}) => {
  return (
    <Box as="article" flex="1 1 auto" minW={0} pr={0}>
      <Box w="100%" maxW="840px" mx="auto">
        <Box ref={headerAnchorRef} aria-hidden height={0} />
        <BreadcrumbHeader
          moduleId={mod.id}
          moduleTitle={mod.title}
          lessonId={lesson.id}
          lessonTitle={lesson.title}
        />
        <MarkdownRenderer content={md} />
      </Box>
    </Box>
  );
};


