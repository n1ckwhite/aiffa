import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useSegmentColors } from '../../../colors/useSegmentColors';
import { SegmentGroupContext } from '../../../model/context';
import type { RootProps } from '../../../types';

const Root: React.FC<RootProps> = ({ value, onValueChange, children, size = 'md', orientation = 'horizontal' }) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const { containerBg, borderColor } = useSegmentColors();
  return (
    <SegmentGroupContext.Provider value={{ value, setValue: onValueChange, rootRef, size, orientation }}>
      <Stack
        ref={rootRef}
        spacing={{ base: 0.5, md: 1 }}
        position="relative"
        p={size === 'xs' ? '2px' : '4px'}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="full"
        role="tablist"
        aria-orientation={orientation}
        overflow="hidden"
        bg={containerBg}
        display="inline-flex"
        w="auto"
        justify="center"
        align="center"
        minW="max-content"
        flexShrink={0}
        boxShadow="sm"
        direction={orientation === 'vertical' ? 'column' : 'row'}
      >
        {children}
      </Stack>
    </SegmentGroupContext.Provider>
  );
};

export default Root;


