import type { RefObject } from 'react';
import type { LessonPageViewProps } from '../../../../types';
import type { useLessonPageColors } from '../../../../colors';

export type MainColumnProps = {
  headerAnchorRef: RefObject<HTMLDivElement | null>;
  lesson: LessonPageViewProps['lesson'];
  mod: LessonPageViewProps['mod'];
  md: string;
  colors: ReturnType<typeof useLessonPageColors>;
  firstAuthor?: { username: string; name: string };
};


