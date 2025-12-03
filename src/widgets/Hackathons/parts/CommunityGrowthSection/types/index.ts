export type CommunityMetricId = "participants" | "weeklyTasks" | "supports";

export type CommunityMetric = {
  id: CommunityMetricId;
  valueLabel: string;
  description: string;
};


