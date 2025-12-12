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
      lessons: 120,
      weeklyTasks: 20,
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
      lessons: 40,
      weeklyTasks: 60,
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
      lessons: 80,
      weeklyTasks: 40,
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
    id: "alex-backend",
    name: "Alex Backend",
    role: "author",
    avatar: undefined,
    title: "Автор материалов по бэкенду",
    direction: "Backend",
    contributions: {
      lessons: 60,
      weeklyTasks: 10,
      projects: 8,
      reviews: 45,
    },
    areas: ["materials", "weekly", "projects"],
    roleGroups: ["materialsAuthors", "weeklyAuthors"],
    profileLinks: [
      {
        type: "github",
        label: "GitHub",
        href: "https://github.com/",
      },
    ],
  },
  {
    id: "maria-data",
    name: "Maria Data",
    role: "mentor",
    avatar: undefined,
    title: "Ментор по данным и ML",
    direction: "Machine Learning",
    contributions: {
      lessons: 50,
      weeklyTasks: 25,
      projects: 9,
      reviews: 80,
    },
    areas: ["materials", "weekly", "projects", "support"],
    roleGroups: ["mentorsReviewers", "supporters"],
    profileLinks: [
      {
        type: "telegram",
        label: "Telegram",
        href: "https://t.me/",
      },
    ],
  },
];
const roles: Creator["role"][] = ["author", "mentor", "reviewer", "maintainer"];

const generatedCreators: Creator[] = Array.from({ length: 95 }, (_, index) => {
  const i = index + 1;
  const role = roles[i % roles.length];

  const lessons = 10 + (i % 40);
  const weeklyTasks = 5 + (i % 25);
  const projects = 1 + (i % 8);
  const reviews = 5 + (i % 60);

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
    id: `creator-auto-${i}`,
    name: `Creator ${i}`,
    role,
    avatar: undefined,
    title: "Участник сообщества AIFFA",
    direction: role === "author" ? "Frontend" : role === "mentor" ? "Mentor" : "Community",
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


