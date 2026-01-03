import React from 'react';
import { Text } from '@chakra-ui/react';

type TocTitleProps = {
  color: string;
};

export const TocTitle: React.FC<TocTitleProps> = ({ color }) => {
  return (
    <Text
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="wider"
      textTransform="uppercase"
      mb={3}
      color={color}
    >
      На этой странице
    </Text>
  );
};


