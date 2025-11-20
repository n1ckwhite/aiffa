export type AchievementItem = {
  id: string;
  label: string;
  achieved: boolean;
  color: string;
  icon: any;
  from: string;
  to: string;
};

export type AchievementsSectionProps = {
  items: AchievementItem[];
  skeletonBg: string;
};


