import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { TaskCardProps } from './types';
import { TaskHeader } from '../TaskHeader';
import { TaskMeta, TaskHint, TaskRenderer } from 'widgets/LessonTasks';
import { taskTypeDescription } from '../../model/taskDescriptions';

export const TaskCard: React.FC<TaskCardProps> = ({ task, idx, solvedById, setSolved, colors, onValidated }) => {
  const headerId = `task-header-${task.id}`;
  const solved = !!solvedById[task.id];
  const attempted = Object.prototype.hasOwnProperty.call(solvedById, task.id);
  const isWrong = attempted && solvedById[task.id] === false;

  const tt = (task as any).type as string | undefined;
  const desc = (task as any).description || (tt ? taskTypeDescription[tt] : undefined);

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderColor={colors.taskCardBorder}
      borderRadius="2xl"
      py={{ base: 4, md: 5 }}
      px={{ base: 4, md: 5 }}
      bg={colors.taskCardBg}
      boxShadow="none"
      transition="background 180ms ease"
      _hover={{ bg: colors.taskCardHoverBg }}
    >
      <TaskHeader
        headerId={headerId}
        idx={idx}
        title={(task as any).title}
        solved={solved}
        isWrong={isWrong}
        indexChipBg={colors.indexChipBg}
        accent={colors.accent}
      />
      {desc ? (<Text fontSize={{ base: 'sm', md: 'sm' }} color={colors.descColor} mb={3}>{desc}</Text>) : null}
      <TaskMeta type={(task as any).type} difficulty={(task as any).difficulty} minutes={(task as any).minutes} />
      <TaskHint content={(task as any).hint} accent={colors.accent} taskType={(task as any).type} index={idx + 1} />
      <TaskRenderer
        task={task}
        accent={colors.accent}
        borderColor={colors.borderColor}
        descColor={colors.descColor}
        onSolvedChange={(ok) => setSolved(task.id, ok)}
        onValidated={() => onValidated(headerId)}
      />
      {/* Resources list stays inline for now to avoid over-splitting; can be extracted later if needed */}
      {Array.isArray((task as any).resources) && (task as any).resources.length > 0 && (
        <Box mt={3}>
          <Text fontSize="xs" color={colors.descColor} mb={1}>Полезные материалы</Text>
          {/* Links rendered by TaskRenderer container to preserve current behavior */}
        </Box>
      )}
    </Box>
  );
};


