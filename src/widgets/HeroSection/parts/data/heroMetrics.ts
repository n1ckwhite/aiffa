type MetricsItem = {
  id: string;
  valueLabel?: string;
  description?: string;
};

type MetricsValues = {
  participantsValue: string;
  participantsLabel: string;
  weeklyValue: string;
  weeklyLabel: string;
};

export const getHeroMetricsValues = (metrics: MetricsItem[]): MetricsValues => {
  const participants = metrics.find((m) => m.id === "participants") || {
    valueLabel: "—",
    description: "активных участников платформы",
  };
  const weeklyTasks = metrics.find((m) => m.id === "weeklyTasks") || {
    valueLabel: "—",
    description: "решений задач недели",
  };

  return {
    participantsValue: participants.valueLabel || "—",
    participantsLabel: participants.description || "активных участников платформы",
    weeklyValue: weeklyTasks.valueLabel || "—",
    weeklyLabel: weeklyTasks.description || "решений задач недели",
  };
};
