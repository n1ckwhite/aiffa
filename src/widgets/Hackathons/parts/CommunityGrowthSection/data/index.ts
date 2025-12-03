import type { CommunityMetric } from "../types";

export const useHackathonsCommunityMetrics = (): CommunityMetric[] => [
  {
    id: "participants",
    valueLabel: "120+",
    description: "активных участников платформы",
  },
  {
    id: "weeklyTasks",
    valueLabel: "40+",
    description: "решений задач недели",
  },
  {
    id: "supports",
    valueLabel: "50+",
    description: "оплаченных поддержек проекта",
  },
];


