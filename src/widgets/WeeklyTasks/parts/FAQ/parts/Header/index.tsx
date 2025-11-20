import React from 'react';
import { HStack, Heading } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

export const FAQHeader: React.FC<{ color: string }> = ({ color }) => {
  return (
    <HStack mb={2} spacing={3} color={color}>
      <QuestionOutlineIcon />
      <Heading as="h2" size="md" letterSpacing="wider">Частые вопросы</Heading>
    </HStack>
  );
};


