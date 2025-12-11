import type { Creator } from "./types";

const baseCreators: Creator[] = [
  {
    id: "nick-white",
    name: "Nick White",
    role: "maintainer",
    avatar: undefined,
    title: "Создатель AIFFA и куратор платформы",
    description:
      "Отвечает за вектор развития AIFFA, архитектуру модулей и Weekly‑формат. Делает так, чтобы обучение ощущалось как естественный рост, а не как скучный курс.",
    badges: [
      { id: "vision", label: "Вижн‑лид" },
      { id: "weekly", label: "Куратор Weekly" },
    ],
    xp: 24800,
    totalContributions: 52,
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
    ],
  },
  {
    id: "petepearl",
    name: "PetePearl",
    role: "author",
    avatar: undefined,
    title: "Автор задач по фронтенду и дизайну",
    description:
      "Готовит задачи, в которых нужно не просто написать код, а сделать по‑настоящему живой интерфейс. Следит за тем, чтобы вы чувствовали вкус к деталям.",
    badges: [
      { id: "frontend", label: "Frontend" },
      { id: "uiux", label: "UI/UX" },
    ],
    xp: 12480,
    totalContributions: 16,
    contributions: {
      lessons: 35,
      weeklyTasks: 28,
      projects: 5,
      reviews: 60,
    },
    areas: ["materials", "weekly", "projects", "articles"],
    roleGroups: ["materialsAuthors", "weeklyAuthors"],
    profileLinks: [],
  },
  {
    id: "community",
    name: "AIFFA Community",
    role: "mentor",
    avatar: undefined,
    title: "Сообщество создателей и ревьюеров",
    description:
      "Люди, которые пишут материалы, придумывают задачи недели, ревьюят решения и помогают другим вырасти. Каждый может стать частью команды создателей.",
    badges: [
      { id: "open", label: "Открыто для новых создателей" },
      { id: "review", label: "Ревью и менторство" },
    ],
    xp: 37200,
    totalContributions: 70,
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
];

const roles: Creator["role"][] = ["author", "mentor", "reviewer", "maintainer"];

const generatedCreators: Creator[] = Array.from({ length: 47 }, (_, index) => {
  const i = index + 1;
  const role = roles[i % roles.length];

  const xp = 4000 + i * 320;
  const totalContributions = 6 + (i % 18);

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
    xp,
    totalContributions,
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


