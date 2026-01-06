import type { StatsRange } from "../types";
import { ContributionStats, ProgressStats } from "./types";

export const rangeLabels: Record<StatsRange, string> = {
  week: "Неделя",
  month: "Месяц",
  all: "Всё время",
};
export const progressStatsByRange: Record<StatsRange, ProgressStats> = {
  week: {
    completedLessons: 8,
    solvedThisWeek: 3,
    solvedProjectsCount: 0,
    readArticlesCount: 0,
    hackathonsParticipationCount: 0,
    sessionsParticipationCount: 0,
    motivationalTop: "Ты активнее 62% пользователей этой недели",
    motivationalBottom: "Ещё 2 задачи — и откроется новое достижение",
  },
  month: {
    completedLessons: 18,
    solvedThisWeek: 12,
    solvedProjectsCount: 1,
    readArticlesCount: 6,
    hackathonsParticipationCount: 1,
    sessionsParticipationCount: 2,
    motivationalTop: "Ты активнее 54% пользователей этого месяца",
    motivationalBottom: "Ещё 3 активности — и откроется новое достижение",
  },
  all: {
    completedLessons: 38,
    solvedThisWeek: 29,
    solvedProjectsCount: 4,
    readArticlesCount: 21,
    hackathonsParticipationCount: 3,
    sessionsParticipationCount: 7,
    motivationalTop: "Ты стабильно растёшь — продолжай в том же духе",
    motivationalBottom: "Выбери цель ниже — и получишь следующее достижение быстрее",
  },
};

export const contributionStatsByRange: Record<StatsRange, ContributionStats> = {
  week: { contributedMaterialsCount: 5, contributedProjectsCount: 0, totalSolvedEver: 3, authoredArticlesCount: 0 },
  month: { contributedMaterialsCount: 7, contributedProjectsCount: 1, totalSolvedEver: 12, authoredArticlesCount: 1 },
  all: { contributedMaterialsCount: 14, contributedProjectsCount: 2, totalSolvedEver: 29, authoredArticlesCount: 4 },
};


