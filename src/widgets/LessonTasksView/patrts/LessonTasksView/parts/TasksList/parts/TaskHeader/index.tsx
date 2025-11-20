import React from 'react';
import { HStack, Box, Text } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import type { TaskHeaderProps } from './types';

export const TaskHeader: React.FC<TaskHeaderProps> = ({ headerId, idx, title, solved, isWrong, indexChipBg, accent }) => {
  return (
    <HStack justify="space-between" align="center" mb={3} id={headerId}>
      <HStack>
        <Box minW="36px" h="36px" borderRadius="full" bg={solved ? 'green.400' : isWrong ? 'red.400' : indexChipBg} color={solved || isWrong ? 'white' : accent} display="flex" alignItems="center" justifyContent="center" fontSize="md" fontWeight="bold">
          {solved ? <CheckIcon boxSize={3.5} color={solved || isWrong ? 'white' : accent} /> : isWrong ? <CloseIcon boxSize={3.5} color={solved || isWrong ? 'white' : accent} /> : (idx + 1)}
        </Box>
        <Text fontWeight="semibold">{title}</Text>
      </HStack>
    </HStack>
  );
};


