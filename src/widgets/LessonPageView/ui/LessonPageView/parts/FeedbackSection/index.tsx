import React from 'react';
import LessonFeedback from 'widgets/Lessons/LessonFeedback';
import type { FeedbackSectionProps } from './types';
import type { VoteChoice } from 'widgets/Lessons/LessonFeedback/types';

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ moduleId, lessonId, onThumbUp }) => {
  const handleVoteChange = (choice: VoteChoice) => {
    if (choice === 'up' && onThumbUp) {
      onThumbUp();
    }
  };

  return <LessonFeedback lessonKey={`${moduleId}/${lessonId}`} onVoteChange={handleVoteChange} />;
};


