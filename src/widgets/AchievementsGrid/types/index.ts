export type AchievementItem = {
  id: string;
  label: string;
  achieved: boolean;
  color: string;
  from: string;
  to: string;
  icon: React.ElementType;
  desc?: string;
};

export type AchievementsGridProps = {
  items: AchievementItem[];
  showHeader?: boolean;
  showBackground?: boolean;
};


