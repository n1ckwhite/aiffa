import React from 'react';
import { Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import type { TasksBadgeProps } from './types';

const getTasksLabel = (n: number): string => {
  const mod10 = n % 10; const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'задача';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'задачи';
  return 'задач';
};

export const TasksBadge: React.FC<TasksBadgeProps> = ({ total, accentColor, chipBorder }) => {
  if (!total || total <= 0) return null;
  const label = getTasksLabel(total);
  return (
    <Box fontSize="xs" color={accentColor} bg="transparent" px={2.5} py={1} borderRadius="full" borderWidth="1px" borderStyle="dashed" borderColor={chipBorder} display="inline-flex" alignItems="center" gap={1.5}>
      <Box as={EditIcon} boxSize={3.5} />
      {total} {label}
    </Box>
  );
};


