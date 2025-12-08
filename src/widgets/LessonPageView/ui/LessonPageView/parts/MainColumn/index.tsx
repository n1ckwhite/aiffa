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
  const initialStarsCount = Number((lesson as any).ratingCount ?? 0);
  const initialViewsCount = Number((lesson as any).views ?? 0);
  const initialCommentsCount = Number((lesson as any).commentsCount ?? 0);
  const [starsCount, setStarsCount] = React.useState<number>(initialStarsCount);
  const [isStarred, setIsStarred] = React.useState<boolean>(false);

  const applyStarChange = (nextStarred: boolean) => {
    setIsStarred(nextStarred);
    setStarsCount((prev) => {
      if (!nextStarred && prev > 0) {
        return prev - 1;
      }
      if (nextStarred) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleToggleStar = () => {
    applyStarChange(!isStarred);
  };

  const tooltipLabel = isStarred
    ? 'Спасибо за вклад! Автор увидит вашу поддержку'
    : 'Отметить материал полезным';

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
        <ActionsBar
          moduleId={mod.id}
          lessonId={lesson.id}
        />
        <FeedbackSection moduleId={mod.id} lessonId={lesson.id} />
      </Box>
    </Box>
  );
};


