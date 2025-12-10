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

export const getAnchorIdForContext = (context: FeedbackContext): string => {
  if (context === 'weekly') {
    return 'weekly-support-anchor';
  }
  if (context === 'tasks') {
    return 'tasks-faq-anchor';
  }
  if (context === 'project') {
    return 'project-support-anchor';
  }
  return 'lesson-tasks-cta-anchor';
};


