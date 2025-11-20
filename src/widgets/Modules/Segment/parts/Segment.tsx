import React from 'react';
import { Box, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import SegmentGroup from 'shared/ui/SegmentGroup';
import type { ModulesSegmentProps } from '../types/ModulesSegment.types';

const Segment: React.FC<ModulesSegmentProps> = ({ value, onChange }) => {
  const segSizeBase = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    xl: 'lg',
  }) as 'xs' | 'sm' | 'md' | 'lg';
  const [isMax350] = useMediaQuery('(max-width: 350px)');
  const segSize = (isMax350 ? 'xs' : segSizeBase) as 'xs' | 'sm' | 'md' | 'lg';

  return (
    <Box display="flex" justifyContent="center" overflowX="visible" w="100%" mb="32px">
      <SegmentGroup.Root value={value} onValueChange={(v) => onChange(v as any)} size={segSize}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Item value="base">
          <SegmentGroup.ItemText>База</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput name="direction" value="base" />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="frontend">
          <SegmentGroup.ItemText>Frontend</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput name="direction" value="frontend" />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="backend">
          <SegmentGroup.ItemText>Backend</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput name="direction" value="backend" />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="devops">
          <SegmentGroup.ItemText>DevOps</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput name="direction" value="devops" />
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Box>
  );
};

export default Segment;


