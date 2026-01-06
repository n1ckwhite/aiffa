import React from 'react';
import { useAuthorCardColors, useAuthorSupportTexts } from 'shared/ui/AuthorCard';
import { useLocalStorageFlag } from 'shared/hooks/useLocalStorageFlag';

export const useAuthorNoteSupport = (baseStars: number, storageKey: string) => {
  const { value: isStarred, toggle: handleToggleSupport } = useLocalStorageFlag(storageKey);

  const displayStars = React.useMemo(
    () => baseStars + (isStarred ? 1 : 0),
    [baseStars, isStarred],
  );

  const { tooltipLabel, supportLabel } = useAuthorSupportTexts(isStarred);
  const {
    badgeBg,
    badgeBorder,
    badgeTextColor,
    hoverBg,
    activeBg,
    tooltipBg,
    tooltipTextColor,
  } = useAuthorCardColors(isStarred);

  return {
    isStarred,
    displayStars,
    tooltipLabel,
    supportLabel,
    badgeBg,
    badgeBorder,
    badgeTextColor,
    hoverBg,
    activeBg,
    tooltipBg,
    tooltipTextColor,
    handleToggleSupport,
  };
};


