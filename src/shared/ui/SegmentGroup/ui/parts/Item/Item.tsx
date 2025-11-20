import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSegmentColors } from '../../../colors/useSegmentColors';
import { useSegmentCtx } from '../../../model/context';
import type { ItemProps } from '../../../types';

const Item: React.FC<ItemProps> = ({ value: v, children }) => {
  const { value, setValue, size } = useSegmentCtx();
  const isActive = value === v;
  const { itemInactiveColor } = useSegmentColors();
  const color = isActive ? 'white' : itemInactiveColor;
  const paddings = {
    xs: { px: 3, py: 2 },
    sm: { px: 4, py: 2.5 },
    md: { px: 5, py: 3 },
    lg: { px: 6, py: 3.5 },
  } as const;
  return (
    <Box
      as="button"
      type="button"
      onClick={() => setValue(v)}
      px={paddings[size].px}
      py={paddings[size].py}
      borderRadius="full"
      position="relative"
      zIndex={1}
      data-seg-item="true"
      data-value={v}
      aria-selected={isActive}
      role="tab"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      lineHeight="1"
      _hover={{ opacity: 0.95 }}
      color={color}
      bg="transparent"
      transition="color 120ms ease"
    >
      {children}
    </Box>
  );
};

export default Item;


