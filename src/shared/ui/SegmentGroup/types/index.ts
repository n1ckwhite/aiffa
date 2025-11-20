import React from 'react';

export type SegmentSize = 'xs' | 'sm' | 'md' | 'lg';
export type SegmentOrientation = 'horizontal' | 'vertical';

export type SegmentGroupContextType = {
  value: string;
  setValue: (v: string) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  size: SegmentSize;
  orientation: SegmentOrientation;
};

export type RootProps = {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
  size?: SegmentSize;
  orientation?: SegmentOrientation;
};

export type ItemProps = {
  value: string;
  children: React.ReactNode;
};

export type ItemsProps = {
  items: Array<{ value: string; label: React.ReactNode }>;
  name?: string;
};


