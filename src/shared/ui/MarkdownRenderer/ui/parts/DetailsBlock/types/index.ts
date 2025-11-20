import type React from 'react';

export type DetailsBlockProps = {
  summary: string;
  body: string;
  bodyNode?: React.ReactNode;
  idx: number;
  open: boolean;
  onToggle: () => void;
};


