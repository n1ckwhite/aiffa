import React from 'react';
import { useAuthorSupportTexts } from 'widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard/features/useAuthorSupportTexts';
import { useAuthorCardColors } from 'widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard/colors/useAuthorCardColors';

export const useAuthorNoteSupport = (baseStars: number) => {
  const [isStarred, setIsStarred] = React.useState(false);

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

  const handleToggleSupport = React.useCallback(() => {
    setIsStarred((prev) => !prev);
  }, []);

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


