import type { Creator } from "./types";

const baseCreators: Creator[] = [
  {
    id: "nick-white",
    name: "Nick White",
    role: "maintainer",
    avatar: "https://avatars.githubusercontent.com/n1ckwhite",
    title: "Создатель AIFFA и куратор платформы",
    direction: "Fullstack",
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
    direction: "Frontend",
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
    direction: "Community",
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

export const creators: Creator[] = baseCreators;


