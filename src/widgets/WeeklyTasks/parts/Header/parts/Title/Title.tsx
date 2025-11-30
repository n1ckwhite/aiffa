import React from 'react';
import { HStack, Heading } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { TitleProps } from './types';


const Title: React.FC<TitleProps> = ({ iconColor }) => {
  return (
    <HStack
      justify="center"
      align="center"
      spacing={3}
      mb={3}
      id="weekly-tasks-title"
    >
      <CalendarIcon color={iconColor} boxSize={5} />
      <Heading as="h1" size="lg" textAlign="center">Задачи недели</Heading>
    </HStack>
  );
};

export default Title;


