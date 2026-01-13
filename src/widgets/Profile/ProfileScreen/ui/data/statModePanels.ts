import type { ComponentType } from "react";
import { FiAward, FiBookOpen, FiEdit3, FiFileText, FiPackage, FiTarget, FiVideo } from "react-icons/fi";
import type { ProfilePeopleMode } from "../../model/types";
import type { PlainStatModePanelItem } from "../parts/StatModePanel/model";

export type StatModePanelConfig = {
  title: string;
  description: string;
  icon?: ComponentType<any>;
  items: readonly PlainStatModePanelItem[];
};

export const STAT_MODE_PANELS_BY_MODE: Partial<Record<ProfilePeopleMode, StatModePanelConfig>> = {
  materials: {
    title: "Материалы",
    description: "Подборка ваших пройденных материалов.",
    icon: FiBookOpen,
    items: [{ title: "CSS Grid — шпаргалка", description: "Материал · Пройдено", authorLabel: "AIFFA", authorHref: "/creators" }],
  },
  projects: {
    title: "Проекты",
    description: "Подборка ваших завершённых проектов.",
    icon: FiPackage,
    items: [{ title: "Проект: UI Kit", description: "Завершено", authorLabel: "AIFFA", authorHref: "/creators" }],
  },
  articles: {
    title: "Статьи",
    description: "Прочитанные статьи.",
    icon: FiFileText,
    items: [
      { title: "React memo: когда и зачем", description: "Прочитано · 6 минут", authorLabel: "AIFFA", authorHref: "/creators" },
      { title: "CSS Grid: шпаргалка", description: "Прочитано · 4 минуты", authorLabel: "AIFFA", authorHref: "/creators" },
    ],
  },
  hackathons: {
    title: "Хакатоны",
    description: "Ваше участие в хакатонах.",
    icon: FiAward,
    items: [{ title: "Hackathon #1", description: "Участвовал · 2025", authorLabel: "AIFFA", authorHref: "/creators" }],
  },
  sessions: {
    title: "Сессии",
    description: "Посещённые сессии.",
    icon: FiVideo,
    items: [
      { title: "Сессия: разбор задач недели", description: "Посещено · 45 минут", authorLabel: "AIFFA", authorHref: "/creators" },
      { title: "Сессия: ревью проектов", description: "Посещено · 60 минут", authorLabel: "AIFFA", authorHref: "/creators" },
    ],
  },
  "contrib-materials": {
    title: "Вложено материалов",
    description: "Материалы, добавленные/улучшенные вами.",
    icon: FiBookOpen,
    items: [
      { title: "Материал: Accessibility basics", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" },
      { title: "Материал: Docker dev setup", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" },
    ],
  },
  "contrib-projects": {
    title: "Вложено проектов",
    description: "Проекты по вашему авторству.",
    icon: FiPackage,
    items: [{ title: "Проект: базовый шаблон", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" }],
  },
  "contrib-weekly": {
    title: "Вложено задач недели",
    description: "Задачи недели, опубликованные вами.",
    icon: FiTarget,
    items: [
      { title: "Задача недели: замыкания", description: "Опубликовано", authorLabel: "AIFFA", authorHref: "/creators" },
      { title: "Задача недели: промисы", description: "Опубликовано", authorLabel: "AIFFA", authorHref: "/creators" },
    ],
  },
  "contrib-articles": {
    title: "Написано статей",
    description: "Опубликованные вами статьи.",
    icon: FiEdit3,
    items: [
      { title: "Как писать полезные статьи", description: "Опубликовано · 2025", authorLabel: "AIFFA", authorHref: "/creators" },
      { title: "Next.js metadata SEO", description: "Опубликовано · 2025", authorLabel: "AIFFA", authorHref: "/creators" },
    ],
  },
};

