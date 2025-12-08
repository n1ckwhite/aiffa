import React from 'react';
import LessonFeedback from 'widgets/Lessons/LessonFeedback';
import type { FeedbackSectionProps } from './types';

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ moduleId, lessonId, onSupportClick }) => {
  return <LessonFeedback lessonKey={`${moduleId}/${lessonId}`} onSupportClick={onSupportClick} />;
};


