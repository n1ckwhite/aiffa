import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import type { TasksListProps } from './types';
import { TaskCard } from './parts/TaskCard';

export const TasksList: React.FC<TasksListProps> = ({
  lesson, solvedById, setSolved, descColor, accent, borderColor, indexChipBg, taskCardBg, taskCardBorder, taskCardHoverBg, linkColor, onValidated
}) => {
  const tasks = (lesson as any)?.tasks || [];
  if (tasks.length === 0) {
    return (
      <Text fontSize={{ base: 'sm', md: 'md' }} color={descColor}>
        Для этого этапа пока нет встроенных задач. Вернитесь позже — мы добавим практику.
      </Text>
    );
  }
  return (
    <VStack align="stretch" spacing={{ base: 6, md: 8 }} mt={{ base: 2, md: 4 }}>
      {tasks.map((t: any, idx: number) => {
        return (<TaskCard
          key={t.id}
          task={t}
          idx={idx}
          solvedById={solvedById}
          setSolved={setSolved}
          colors={{ descColor, accent, borderColor, indexChipBg, taskCardBg, taskCardBorder, taskCardHoverBg, linkColor }}
          onValidated={onValidated}
        />);
      })}
    </VStack>
  );
};


