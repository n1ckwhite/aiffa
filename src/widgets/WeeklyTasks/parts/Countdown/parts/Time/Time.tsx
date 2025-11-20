import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { TimeProps } from '../Label/types';

const Time: React.FC<TimeProps> = ({ borderColor, textColor, d, h, m, s }) => {
  return (
    <HStack
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="full"
      px={3}
      py={1}
      fontFamily="mono"
      fontWeight="semibold"
      color={textColor}
    >
      <Text>{String(d).padStart(2,'0')}д</Text>
      <Text>:</Text>
      <Text>{String(h).padStart(2,'0')}ч</Text>
      <Text>:</Text>
      <Text>{String(m).padStart(2,'0')}м</Text>
      <Text>:</Text>
      <Text>{String(s).padStart(2,'0')}с</Text>
    </HStack>
  );
};

export default Time;


