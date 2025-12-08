import React from "react";

export const useProjectAuthorSupport = (project: any) => {
  const initialStarsCount = Number(project?.ratingCount ?? 0);
  const initialViewsCount = Number(project?.views ?? 0);
  const initialCommentsCount = Number(project?.commentsCount ?? 0);

  const [starsCount, setStarsCount] = React.useState<number>(initialStarsCount);
  const [isStarred, setIsStarred] = React.useState<boolean>(false);

  const applyStarChange = (nextStarred: boolean) => {
    setIsStarred(nextStarred);
    setStarsCount((prev) => {
      if (!nextStarred && prev > 0) {
        return prev - 1;
      }
      if (nextStarred) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleToggleStar = () => {
    applyStarChange(!isStarred);
  };

  return {
    starsCount,
    viewsCount: initialViewsCount,
    commentsCount: initialCommentsCount,
    isStarred,
    handleToggleStar,
  };
};


