import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSegmentCtx } from '../../../model/context';

const ItemText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { size } = useSegmentCtx();
  const fontSizes = {
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
  } as const;
  return <Box as="span" fontWeight="semibold" fontSize={fontSizes[size]} whiteSpace="nowrap">{children}</Box>;
};

export default ItemText;


