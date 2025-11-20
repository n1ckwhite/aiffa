import React from 'react';
import { Text } from '@chakra-ui/react';
import type { TaskMetaProps } from './types';
import { useTaskMetaColors } from './colors';
import { useTaskMeta } from './model/useTaskMeta';

export const TaskMeta: React.FC<TaskMetaProps> = ({ difficulty, minutes }) => {
  const { textColor } = useTaskMetaColors();
  const { text } = useTaskMeta(difficulty, minutes);
  if (!text) return null;
  return (<Text fontSize="xs" color={textColor} mb={2}>{text}</Text>);
};


