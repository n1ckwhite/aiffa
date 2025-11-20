import type { WeeklyTierLabel } from '../../TierBadge/types';
import type { WeeklyTaskListItem } from '../model/useWeeklyTasksData';

export type WeeklyTasksGridProps = {
  tasks: WeeklyTaskListItem[];
  tierLabel: WeeklyTierLabel;
};


