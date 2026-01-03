import React from 'react';
import type { FeedbackContext } from '../types';

export const useFeedbackContext = (lessonKey: string): FeedbackContext => {
  return React.useMemo<FeedbackContext>(() => {
    if (lessonKey.startsWith('weekly/')) {
      return 'weekly';
    }
    if (lessonKey.endsWith('/tasks')) {
      return 'tasks';
    }
    if (lessonKey.startsWith('project/')) {
      return 'project';
    }
    return 'lesson';
  }, [lessonKey]);
};


