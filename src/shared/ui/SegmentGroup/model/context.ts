import React from 'react';
import { SegmentGroupContextType } from '../types';

export const SegmentGroupContext = React.createContext<SegmentGroupContextType | null>(null);

export const useSegmentCtx = (): SegmentGroupContextType => {
  const ctx = React.useContext(SegmentGroupContext);
  if (!ctx) throw new Error('SegmentGroup components must be used within SegmentGroup.Root');
  return ctx;
};


