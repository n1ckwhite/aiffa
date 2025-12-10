import React from 'react';

export const useAuthorNoteData = (
  starsCount?: number,
  commentsCount?: number,
  solvedCount?: number,
) => {
  const baseStars = React.useMemo(
    () => (typeof starsCount === 'number' ? starsCount : 37),
    [starsCount],
  );

  const effectiveComments = React.useMemo(
    () => (typeof commentsCount === 'number' ? commentsCount : 12),
    [commentsCount],
  );

  const effectiveSolved = React.useMemo(
    () => (typeof solvedCount === 'number' ? solvedCount : 128),
    [solvedCount],
  );

  return { baseStars, effectiveComments, effectiveSolved };
};


