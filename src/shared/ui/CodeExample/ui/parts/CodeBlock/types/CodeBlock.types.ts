import React from 'react';

export type CodeBlockProps = {
  codeRef: React.RefObject<HTMLElement | null>;
  code: string;
  bg: string;
  borderRadius: number;
  minimal?: boolean;
  defaultCodeTextColor: string;
  isDark: boolean;
};


