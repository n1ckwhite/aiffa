import type { Creator } from "./types";

const baseCreators: Creator[] = [
  {
    id: "nick-white",
    name: "Nick White",
    role: "maintainer",
    avatar: "https://avatars.githubusercontent.com/n1ckwhite",
    title: "Создатель AIFFA и куратор платформы",
    description:
      "Отвечает за вектор развития AIFFA, архитектуру модулей и Weekly‑формат. Делает так, чтобы обучение ощущалось как естественный рост, а не как скучный курс.",
    badges: [
      { id: "vision", label: "Вижн‑лид" },
      { id: "weekly", label: "Куратор Weekly" },
    ],
    contributions: {
      lessons: 80,
      weeklyTasks: 40,
      projects: 12,
      reviews: 150,
    },
    areas: ["materials", "weekly", "projects", "hackathons", "articles", "support"],
    roleGroups: ["maintainers", "materialsAuthors", "weeklyAuthors", "mentorsReviewers", "hackathonParticipants", "supporters"],
    profileLinks: [
      {
        type: "telegram",
        label: "Telegram",
        href: "https://t.me/aiffa_hub",
      },
      {
        type: "github",
        label: "GitHub",
        href: "https://github.com/n1ckwhite",
      },
    ],
  },
  {
    id: "petepearl",
    name: "PetePearl",
    role: "author",
    avatar: "https://avatars.githubusercontent.com/PetePearl",
    title: "Автор задач по фронтенду и дизайну",
    description:
      "Готовит задачи, в которых нужно не просто написать код, а сделать по‑настоящему живой интерфейс. Следит за тем, чтобы вы чувствовали вкус к деталям.",
    badges: [
      { id: "frontend", label: "Frontend" },
      { id: "uiux", label: "UI/UX" },
    ],
    contributions: {
      lessons: 35,
      weeklyTasks: 28,
      projects: 5,
      reviews: 60,
    },
    areas: ["materials", "weekly", "projects", "articles"],
    roleGroups: ["materialsAuthors", "weeklyAuthors"],
    profileLinks: [
      {
        type: "github",
        label: "GitHub",
        href: "https://github.com/PetePearl",
      },
    ],
  },
  {
    id: "community",
    name: "AIFFA Community",
    role: "mentor",
    avatar: "https://avatars.githubusercontent.com/aiffadev",
    title: "Сообщество создателей и ревьюеров",
    description:
      "Люди, которые пишут материалы, придумывают задачи недели, ревьюят решения и помогают другим вырасти. Каждый может стать частью команды создателей.",
    badges: [
      { id: "open", label: "Открыто для новых создателей" },
      { id: "review", label: "Ревью и менторство" },
    ],
    contributions: {
      lessons: 120,
      weeklyTasks: 70,
      projects: 24,
      reviews: 300,
    },
    areas: ["materials", "weekly", "projects", "hackathons", "support"],
    profileLinks: [
      {
        type: "telegram",
        label: "Telegram‑сообщество",
        href: "https://t.me/aiffa_hub",
      },
    ],
    roleGroups: ["mentorsReviewers", "hackathonParticipants", "supporters"],
  },
  {
    id: "dan-abramov",
    name: "Dan Abramov",
    role: "author",
    avatar: "https://avatars.githubusercontent.com/gaearon",
    title: "Инженер и автор образовательных материалов",
    description:
      "Помогает разработчикам лучше понимать React и принципы современного фронтенда. Делает сложные концепции визуальными и доступными.",
    badges: [
      { id: "react", label: "React" },
      { id: "education", label: "Обучение" },
    ],
    contributions: {
      lessons: 60,
      weeklyTasks: 18,
      projects: 9,
      reviews: 110,
    },
    areas: ["materials", "weekly", "projects", "articles"],
    roleGroups: ["materialsAuthors", "weeklyAuthors"],
    profileLinks: [
      {
        type: "github",
        label: "GitHub",
        href: "https://github.com/gaearon",
      },
    ],
  },
  {
    id: "sindre",
    name: "Sindre Sorhus",
    role: "maintainer",
    avatar: "https://avatars.githubusercontent.com/sindresorhus",
    title: "Автор open‑source библиотек и инструментов",
    description:
      "Поддерживает десятки полезных пакетов, которые используют разработчики по всему миру. Показывает, как маленькие утилиты делают экосистему сильнее.",
    badges: [
      { id: "oss", label: "Open‑source" },
      { id: "tools", label: "Инструменты" },
    ],
    contributions: {
      lessons: 45,
      weeklyTasks: 20,
      projects: 14,
      reviews: 160,
    },
    areas: ["materials", "projects", "support"],
    roleGroups: ["maintainers", "supporters"],
    profileLinks: [
      {
        type: "github",
        label: "GitHub",
        href: "https://github.com/sindresorhus",
      },
    ],
  },
  {
    id: "evan-you",
    name: "Evan You",
    role: "mentor",
    avatar: "https://avatars.githubusercontent.com/yyx990803",
    title: "Создатель Vue и ментор фронтенд‑сообщества",
    description:
      "Показывает, как построить современный фронтенд‑стек и оставаться внимательным к DX. Делится опытом создания фреймворков и экосистемы вокруг них.",
    badges: [
      { id: "vue", label: "Vue" },
      { id: "mentor", label: "Менторство" },
    ],
    contributions: {
      lessons: 55,
      weeklyTasks: 16,
      projects: 11,
      reviews: 140,
    },
    areas: ["materials", "projects", "hackathons"],
    roleGroups: ["mentorsReviewers", "hackathonParticipants"],
    profileLinks: [
      {
        type: "github",
        label: "GitHub",
        href: "https://github.com/yyx990803",
      },
    ],
  },
];

const roles: Creator["role"][] = ["author", "mentor", "reviewer", "maintainer"];

const generatedCreators: Creator[] = Array.from({ length: 47 }, (_, index) => {
  const i = index + 1;
  const role = roles[i % roles.length];

  const lessons = 5 + (i % 10);
  const weeklyTasks = 3 + (i % 8);
  const projects = 1 + (i % 6);
  const reviews = 10 + (i % 20);

  const areas: Creator["areas"] =
    i % 5 === 0
      ? ["materials", "weekly", "projects", "hackathons", "support"]
      : i % 3 === 0
      ? ["materials", "weekly", "projects"]
      : ["materials", "weekly"];

  const roleGroups: Creator["roleGroups"] =
    role === "maintainer"
      ? ["maintainers"]
      : role === "author"
      ? ["materialsAuthors", "weeklyAuthors"]
      : role === "mentor" || role === "reviewer"
      ? ["mentorsReviewers"]
      : ["supporters"];

  return {
    id: `creator-${i}`,
    name: `Creator ${i}`,
    role,
    avatar: undefined,
    title: "Участник сообщества AIFFA",
    description: "Добавляет задачи, материалы и помогает другим участникам расти через ревью и обсуждения.",
    badges: [
      { id: "community", label: "Сообщество" },
      { id: "active", label: "Активный вклад" },
    ],
    contributions: {
      lessons,
      weeklyTasks,
      projects,
      reviews,
    },
    areas,
    roleGroups,
    profileLinks: [],
  };
});

export const creators: Creator[] = [...baseCreators, ...generatedCreators];


