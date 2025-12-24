import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useModuleLevel } from '../../../../hooks/useModuleLevel';
import type { LessonsGridProps } from './types';
import { arrowLoop } from '../ProjectLink/animations';
import { ItemCard } from './parts/ItemCard';
import { PaginationBar } from './parts/PaginationBar';

export const LessonsGrid: React.FC<LessonsGridProps> = ({ mod, colors, solvedMap, currentPage, getPageHref }) => {
  const pageSize = 4;
  const lessons = mod?.lessons || [];
  const totalPages = Math.max(1, Math.ceil(lessons.length / pageSize));
  const isUrlPagination = typeof getPageHref === 'function';

  const makePageItems = React.useCallback((total: number, current: number) => {
    const radius = 2;
    const fullLimit = 7;
    if (total <= fullLimit) return Array.from({ length: total }, (_, i) => i + 1) as (number | string)[];
    const items: (number | string)[] = [];
    items.push(1);
    const left = Math.max(2, current - radius);
    const right = Math.min(total - 1, current + radius);
    if (left > 2) items.push('…');
    for (let i = left; i <= right; i++) items.push(i);
    if (right < total - 1) items.push('…');
    items.push(total);
    return items;
  }, []);

  const page = Math.min(totalPages, Math.max(1, Number.isFinite(Number(currentPage)) ? Number(currentPage) : 1));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const visible = lessons.slice(start, end);
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pageItems = React.useMemo(() => makePageItems(totalPages, page), [makePageItems, totalPages, page]);

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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full" minW={0}>
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

      {totalPages > 1 && isUrlPagination && (
        <PaginationBar
          page={page}
          canPrev={canPrev}
          canNext={canNext}
          totalPages={totalPages}
          pageItems={pageItems}
          getPageHref={getPageHref}
          colors={colors}
        />
      )}
    </>
  );
};


