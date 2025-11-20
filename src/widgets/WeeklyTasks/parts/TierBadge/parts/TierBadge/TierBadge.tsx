import React from 'react';
import type { WeeklyTasksTierBadgeProps } from '../../types';
import { Root } from '..';

const TierBadge: React.FC<WeeklyTasksTierBadgeProps> = ({ label }) => {
  return <Root label={label} />;
};

export default TierBadge;


