import React from 'react';
import type { FeedbackContext } from '../types';
import { getImprovementTexts } from '../data/improvementTexts';

export const useImprovementTexts = (context: FeedbackContext) => {
  return React.useMemo(() => getImprovementTexts(context), [context]);
};


