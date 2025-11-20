import React from 'react';
import { Text } from '@chakra-ui/react';

export type LabelProps = { color: string };

const Label: React.FC<LabelProps> = ({ color }) => {
  return (
    <Text fontSize={{ base: 'sm', md: 'md' }} color={color} textAlign="center">
      До обновления задач недели осталось:
    </Text>
  );
};

export default Label;


