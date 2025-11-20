import React from 'react';
import { Box } from '@chakra-ui/react';
import MarkdownRenderer from 'shared/ui/MarkdownRenderer';
import type { MainColumnProps } from './types';
import { BreadcrumbHeader } from '../BreadcrumbHeader';
import { AuthorCard } from '../AuthorCard';
import { ActionsBar } from '../ActionsBar';
import { FeedbackSection } from '../FeedbackSection';

export const MainColumn: React.FC<MainColumnProps> = ({
  headerAnchorRef,
  lesson,
  mod,
  md,
  colors,
  firstAuthor,
}) => {
  return (
    <Box flex="1 1 auto" minW={0} pr={0}>
      <Box w="100%" maxW="840px" mx="auto">
        <Box ref={headerAnchorRef} aria-hidden height={0} />
        <BreadcrumbHeader moduleId={mod.id} moduleTitle={mod.title} lessonId={lesson.id} lessonTitle={lesson.title} />
        <AuthorCard author={firstAuthor} borderColor={colors.authorBorderColor} descColor={colors.descColor} linkColor={colors.linkColor} />
        <MarkdownRenderer content={md} />
        <ActionsBar moduleId={mod.id} lessonId={lesson.id} />
        <FeedbackSection moduleId={mod.id} lessonId={lesson.id} />
      </Box>
    </Box>
  );
};


