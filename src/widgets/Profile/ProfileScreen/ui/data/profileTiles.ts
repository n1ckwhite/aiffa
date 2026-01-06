import { ContributionStats, ProgressStats } from "../../model/constants/types";
import type { StatTileModel } from "../../model/types";
import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiEdit3,
  FiFileText,
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
    },
    {
      label: "Задач недели решено",
      value: stats.solvedThisWeek,
      icon: FiCheckCircle,
      accentColor: "green.400",
      tooltip: "Сколько задач недели вы решили всего",
      emphasis: true,
    },
    {
      label: "Пройдено проектов",
      value: stats.solvedProjectsCount,
      icon: FiCode,
      accentColor: "purple.400",
      tooltip: "Сколько проектов вы завершили на платформе.",
    },
    {
      label: "Прочтено статей",
      value: stats.readArticlesCount,
      icon: FiFileText,
      accentColor: "orange.400",
      tooltip: "Сколько статей из блога вы прочитали (по вашему прогрессу).",
    },
    {
      label: "Участие в хакатонах",
      value: stats.hackathonsParticipationCount,
      icon: FiAward,
      accentColor: "pink.400",
      tooltip: "Ваше участие в хакатонах",
    },
    {
      label: "Участие на сессиях",
      value: stats.sessionsParticipationCount,
      icon: FiVideo,
      accentColor: "cyan.400",
      tooltip: "Сколько сессий вы посетили (созвоны/разборы/встречи).",
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
    },
    {
      label: "Вложено проектов",
      value: stats.contributedProjectsCount,
      icon: FiPackage,
      accentColor: "purple.400",
      tooltip: "Сколько проектов вы добавили или улучшили (по авторству).",
    },
    {
      label: "Вложено задач недели",
      value: stats.totalSolvedEver,
      icon: FiTarget,
      accentColor: "green.400",
      tooltip: "Сколько задач недели вы выложили (по авторству)",
    },
    {
      label: "Написано статей",
      value: stats.authoredArticlesCount,
      icon: FiEdit3,
      accentColor: "orange.400",
      tooltip: "Сколько статей вы опубликовали в блоге AIFFA.",
    },
  ];
};


