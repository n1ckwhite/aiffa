import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { usePagination } from '../../../../hooks/usePagination';
import { useModuleLevel } from '../../../../hooks/useModuleLevel';
import type { LessonsGridProps } from './types';
import { arrowLoop } from '../ProjectLink/animations';
import { ItemCard } from './parts/ItemCard';
import { PaginationBar } from './parts/PaginationBar';

export const LessonsGrid: React.FC<LessonsGridProps> = ({ mod, colors, solvedMap }) => {
  const pageSize = 4;
  const lessons = mod?.lessons || [];
  const { page, setPage, totalPages, canPrev, canNext, start, end, pageItems } = usePagination(
    lessons.length,
    pageSize,
    mod?.id,
  );
  const visible = lessons.slice(start, end);

  const arrowAnimCss = `${arrowLoop} 900ms ease-in-out infinite`;
  const { level } = useModuleLevel(mod?.id);
  const levelAccent =
    level === 'beginner'
      ? colors.beginnerBorder
      : level === 'intermediate'
        ? colors.intermediateBorder
        : colors.advancedBorder;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {visible.map((lesson: any, idx: number) => {
          const totalTasks = Array.isArray(lesson?.tasks) ? lesson.tasks.length : 0;
          const lessonPrefix = `${mod.id}/${lesson.id}/`;
          let solvedCount = 0;
          if (totalTasks > 0) {
            try {
              for (const k of Object.keys(solvedMap)) { if (k.startsWith(lessonPrefix)) solvedCount += 1; }
            } catch {}
          }
          const done = totalTasks > 0 && solvedCount >= totalTasks;
          return (
            <ItemCard
              key={lesson.id}
              lesson={lesson}
              href={`/learn/${mod.id}/${lesson.id}`}
              idx={idx}
              start={start}
              colors={colors}
              levelAccent={levelAccent}
              arrowAnimationCss={arrowAnimCss}
              done={done}
            />
          );
        })}
      </SimpleGrid>

      {totalPages > 1 && (
        <PaginationBar
          page={page}
          setPage={setPage}
          canPrev={canPrev}
          canNext={canNext}
          totalPages={totalPages}
          pageItems={pageItems}
          colors={colors}
        />
      )}
    </>
  );
};


