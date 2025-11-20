import React from 'react';

export const useOpenDetails = (content: string) => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const toggle = React.useCallback((i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  }, []);
  React.useEffect(() => {
    setOpenIdx(null);
  }, [content]);
  return { openIdx, toggle };
};


