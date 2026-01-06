import React from 'react';
import { useLocalStorageFlag } from 'shared/hooks/useLocalStorageFlag';

export const useProjectAuthorSupport = (project: any) => {
  const initialStarsCount = Number(project?.ratingCount ?? 0);
  const initialViewsCount = Number(project?.views ?? 0);
  const initialCommentsCount = Number(project?.commentsCount ?? 0);

  const projectId = String(project?.id ?? "");
  const { value: isStarred, toggle: handleToggleStar } = useLocalStorageFlag(`project-starred:${projectId}`);
  const starsCount = initialStarsCount + (isStarred ? 1 : 0);

  return {
    starsCount,
    viewsCount: initialViewsCount,
    commentsCount: initialCommentsCount,
    isStarred,
    handleToggleStar,
  };
};


