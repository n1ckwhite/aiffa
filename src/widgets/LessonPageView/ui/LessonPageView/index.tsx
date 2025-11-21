import React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { useLessonMarkdown } from '../../hooks/useLessonMarkdown';
import { useHeaderAlign } from '../../hooks/useHeaderAlign';
import { useTableOfContents } from '../../hooks/useTableOfContents';
import { useLessonPageColors } from '../../colors';
import type { LessonPageViewProps } from '../../types';
import { MainColumn } from './parts/MainColumn';
import { TocPanel } from './parts/TocPanel';
import { LessonNavBar } from './parts/LessonNavBar';

export const LessonPageView: React.FC<LessonPageViewProps> = ({ lesson, mod, initialMarkdown }) => {
  const md = useLessonMarkdown(lesson?.mdPath, initialMarkdown);
  const headerAnchorRef = React.useRef<HTMLDivElement | null>(null);
  useHeaderAlign(headerAnchorRef, [lesson?.id, mod?.id]);
  const colors = useLessonPageColors();
  const firstAuthor = (lesson as any)?.authors?.[0] as { username: string; name: string } | undefined;
  const { tocItems, activeTocId, setActiveTocId } = useTableOfContents(md);

  if (!md) return (<VStack align="stretch" gap={6} pb="32px"><Box /></VStack>);

  return (
    <VStack align="stretch" gap={6} pb="32px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <HStack gap={6} align="flex-start">
        <MainColumn headerAnchorRef={headerAnchorRef} lesson={lesson} mod={mod} md={md} colors={colors} firstAuthor={firstAuthor} />
        <TocPanel
          tocItems={tocItems}
          activeTocId={activeTocId}
          setActiveTocId={(id) => setActiveTocId(id)}
          colors={{
            tocTitleColor: colors.tocTitleColor,
            tocItemRadius: colors.tocItemRadius,
            tocItemPxBase: colors.tocItemPxBase,
            tocItemPxLg: colors.tocItemPxLg,
            tocItemPyBase: colors.tocItemPyBase,
            tocItemPyLg: colors.tocItemPyLg,
            tocItemGap: colors.tocItemGap,
            tocItemMinHBase: colors.tocItemMinHBase,
            tocItemMinHLg: colors.tocItemMinHLg,
            tocActiveBg: colors.tocActiveBg,
            tocInactiveColor: colors.tocInactiveColor,
            linkColor: colors.linkColor,
          }}
        />
      </HStack>
      {md && (<LessonNavBar moduleId={mod.id} lessonId={lesson.id} />)}
    </VStack>
  );
};


