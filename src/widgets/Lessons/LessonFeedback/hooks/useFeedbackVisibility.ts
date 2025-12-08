import React from 'react';
import { useFeedbackContext, getAnchorIdForContext } from './useFeedbackContext';

export const useFeedbackVisibility = (
  lessonKey: string,
  isWide: boolean,
  showThanks: boolean,
) => {
  const context = useFeedbackContext(lessonKey);
  const [hasReachedTrigger, setHasReachedTrigger] = React.useState<boolean>(isWide);

  React.useEffect(() => {
    if (isWide) {
      setHasReachedTrigger(true);
      return;
    }

    const handlePositionCheck = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const anchorId = getAnchorIdForContext(context);
      const anchor = document.getElementById(anchorId);
      if (!anchor) {
        return;
      }
      const rect = anchor.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const reachedNow = rect.top <= viewportHeight * 0.7;
      if (reachedNow) {
        setHasReachedTrigger(true);
      }
    };

    handlePositionCheck();
    window.addEventListener('scroll', handlePositionCheck);
    window.addEventListener('resize', handlePositionCheck);

    return () => {
      window.removeEventListener('scroll', handlePositionCheck);
      window.removeEventListener('resize', handlePositionCheck);
    };
  }, [isWide, context]);

  const shouldShowQuestion = !showThanks && hasReachedTrigger;
  const shouldShowThanks = showThanks;

  return {
    context,
    hasReachedTrigger,
    shouldShowQuestion,
    shouldShowThanks,
  };
};


