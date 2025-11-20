import React from 'react';
import { HStack, Text, Icon } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa6';

const Title: React.FC = () => {
  return (
    <HStack spacing={2}>
      <Icon as={FaGithub as unknown as React.ElementType} />
      <Text fontWeight="semibold">GitHub</Text>
    </HStack>
  );
};

export default Title;


