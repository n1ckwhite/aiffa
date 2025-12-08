import type React from 'react';

export type AuthorsCountPillProps = {
  count: number;
  color?: string;
  borderColor?: string;
  showPlus?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};


