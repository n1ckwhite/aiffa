import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import WeeklyTaskCard from 'widgets/WeeklyTaskCard';
import type { WeeklyTasksGridProps } from './types';
import type { WeeklyTaskListItem } from './model/useWeeklyTasksData';

const TasksGrid: React.FC<WeeklyTasksGridProps> = ({ tasks, tierLabel }) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 5, md: 7, lg: 8 }}>
      {tasks
        .filter((t: WeeklyTaskListItem) => {
          if (!t.level) return true;
          return t.level === tierLabel;
        })
        .map((t: WeeklyTaskListItem) => {
          const displayLabel = t.label;
          const displayDesc = t.description;
          return (
            <WeeklyTaskCard
              key={t.id}
              taskId={t.id}
              label={displayLabel}
              description={displayDesc}
              done={t.done}
              tag={t.tag}
              icon={t.icon as any}
              colorScheme={t.color}
              to={`/weekly/${t.id}`}
              authorName={t.authorName}
              authorUrl={t.authorUrl}
              starsCount={t.starsCount}
              commentsCount={t.commentsCount}
              solvedCount={t.solvedCount}
            />
          );
        })}
    </SimpleGrid>
  );
};

export default TasksGrid;


