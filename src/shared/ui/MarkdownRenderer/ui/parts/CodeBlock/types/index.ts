import type React from 'react';

export type CodeBlockProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Record<string, any>;


