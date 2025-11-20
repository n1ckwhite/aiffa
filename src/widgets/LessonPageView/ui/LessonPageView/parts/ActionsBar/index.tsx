import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import type { ActionsBarProps } from './types';

export const ActionsBar: React.FC<ActionsBarProps> = ({ moduleId, lessonId }) => {
  return (
    <HStack mt={6}>
      <Button as={RouterLink} to={`/learn/${moduleId}/${lessonId}/tasks`} variant="solid" bg="blue.600" color="white" _hover={{ bg: 'blue.700', transform: 'translateY(-1px)' }} _active={{ bg: 'blue.800' }} leftIcon={<EditIcon />} borderRadius="full" px={5} py={2} boxShadow="0 6px 20px rgba(59,130,246,0.25)">
        Перейти к задачам этапа
      </Button>
    </HStack>
  );
};


