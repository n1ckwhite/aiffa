import { useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

type Options = {
  baseCols: number;
  mdCols: number;
  lgCols: number;
};

export const useStaggeredDelay = (opts: Options) => {
  const cols = useBreakpointValue<number>({
    base: opts.baseCols,
    md: opts.mdCols,
    lg: opts.lgCols,
  }) || opts.baseCols;

  const getDelay = React.useCallback((index: number) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const perCol = 0.08; 
    const perRow = 0.12; 
    return row * perRow + col * perCol;
  }, [cols]);

  return getDelay;
};



