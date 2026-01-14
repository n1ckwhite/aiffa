import { ContributionStats, ProgressStats } from "../../model/constants/types";
import type { StatTileModel } from "../../model/types";
import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiEdit3,
  FiPackage,
  FiTarget,
  FiVideo,
} from "react-icons/fi";

export const CONTRIBUTION_HINT = "По авторству в базе AIFFA";

export const buildProgressTiles = (stats: ProgressStats): StatTileModel[] => {
  return [
    {
      label: "Пройдено материалов",
      value: stats.completedLessons,
      icon: FiBookOpen,
      accentColor: "blue.400",
      tooltip: "Сколько материалов вы уже изучили на платформе.",
      mode: "materials",
    },
    {
      label: "Задач недели решено",
      value: stats.solvedThisWeek,
      icon: FiCheckCircle,
      accentColor: "green.400",
      tooltip: "Сколько задач недели вы решили всего",
      emphasis: true,
      mode: "weekly",
    },
    {
      label: "Пройдено проектов",
      value: stats.solvedProjectsCount,
      icon: FiPackage,
      accentColor: "purple.400",
      tooltip: "Сколько проектов вы завершили на платформе.",
      mode: "projects",
    },
    {
      label: "Участие в хакатонах",
      value: stats.hackathonsParticipationCount,
      icon: FiAward,
      accentColor: "pink.400",
      tooltip: "Ваше участие в хакатонах",
      mode: "hackathons",
    },
    {
      label: "Участие на сессиях",
      value: stats.sessionsParticipationCount,
      icon: FiVideo,
      accentColor: "cyan.400",
      tooltip: "Сколько сессий вы посетили (созвоны/разборы/встречи).",
      mode: "sessions",
    },
  ];
};

export const buildContributionTiles = (stats: ContributionStats): StatTileModel[] => {
  return [
    {
      label: "Вложено материалов",
      value: stats.contributedMaterialsCount,
      icon: FiBookOpen,
      accentColor: "blue.400",
      tooltip: "Сколько материалов вы вложили в базу AIFFA (по авторству).",
      mode: "contrib-materials",
    },
    {
      label: "Вложено проектов",
      value: stats.contributedProjectsCount,
      icon: FiPackage,
      accentColor: "purple.400",
      tooltip: "Сколько проектов вы добавили или улучшили (по авторству).",
      mode: "contrib-projects",
    },
    {
      label: "Вложено задач недели",
      value: stats.totalSolvedEver,
      icon: FiTarget,
      accentColor: "green.400",
      tooltip: "Сколько задач недели вы выложили (по авторству)",
      mode: "contrib-weekly",
    },
    {
      label: "Написано статей",
      value: stats.authoredArticlesCount,
      icon: FiEdit3,
      accentColor: "orange.400",
      tooltip: "Сколько статей вы опубликовали в блоге AIFFA.",
      mode: "contrib-articles",
    },
  ];
};


