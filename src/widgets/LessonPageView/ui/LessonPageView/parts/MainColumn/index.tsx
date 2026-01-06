import React from 'react';
import { Box } from '@chakra-ui/react';
import MarkdownRenderer from 'shared/ui/MarkdownRenderer';
import { useLocalStorageFlag } from 'shared/hooks/useLocalStorageFlag';
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
  const initialStarsCount = Number((lesson as any).ratingCount ?? 0);
  const initialViewsCount = Number((lesson as any).views ?? 0);
  const initialCommentsCount = Number((lesson as any).commentsCount ?? 0);
  const lessonId = String((lesson as any)?.id ?? "");
  const { value: isStarred, toggle: handleToggleStar } = useLocalStorageFlag(`lesson-starred:${lessonId}`);
  const starsCount = initialStarsCount + (isStarred ? 1 : 0);

  const handleSupportClick = () => {
    if (isStarred) return;
    handleToggleStar();
  };

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
        <AuthorCard
          author={firstAuthor}
          borderColor={colors.authorBorderColor}
          descColor={colors.descColor}
          linkColor={colors.linkColor}
          starsCount={starsCount}
          viewsCount={initialViewsCount}
          commentsCount={initialCommentsCount}
          isStarred={isStarred}
          onToggleStar={handleToggleStar}
        />
        <MarkdownRenderer content={md} />
        <Box id="lesson-tasks-cta-anchor">
          <ActionsBar
            moduleId={mod.id}
            lessonId={lesson.id}
          />
        </Box>
        <FeedbackSection moduleId={mod.id} lessonId={lesson.id} onSupportClick={handleSupportClick} />
      </Box>
    </Box>
  );
};


