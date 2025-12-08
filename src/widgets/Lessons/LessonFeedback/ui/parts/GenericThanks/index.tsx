import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/react';
import { GenericThanksProps } from './types';

export const GenericThanks: React.FC<GenericThanksProps> = ({ thanksColor }) => {
  return (
    <HStack align="center" spacing={2}>
      <CheckCircleIcon boxSize={4} color={thanksColor} />
      <Text fontSize="sm" fontWeight="semibold" color={thanksColor}>
        Спасибо за ваш отзыв!
      </Text>
    </HStack>
  );
};


