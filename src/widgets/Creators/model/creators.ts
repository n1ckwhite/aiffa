import type { Creator } from "./types";

type BaseCreator = Omit<Creator, "profileLinks" | "avatar"> & {
  avatar?: Creator["avatar"];
  profileLinks?: Creator["profileLinks"];
};

const baseCreators: BaseCreator[] = [
  {
    id: "nick-white",
    name: "Nick White",
    role: "maintainer",
    avatar: "https://avatars.githubusercontent.com/n1ckwhite",
    githubUsername: "n1ckwhite",
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
    ],
  },
  {
    id: "petepearl",
    name: "PetePearl",
    role: "author",
    avatar: "https://avatars.githubusercontent.com/PetePearl",
    githubUsername: "PetePearl",
    title: "Автор Материалов AIFFA",
    direction: "Frontend",
    contributions: {
      lessons: 40,
      weeklyTasks: 60,
      projects: 5,
      reviews: 60,
    },
    areas: ["materials", "weekly", "projects", "articles"],
    roleGroups: ["materialsAuthors", "weeklyAuthors"],
  },
  {
    id: "community",
    name: "AIFFA Community",
    role: "mentor",
    avatar: "https://avatars.githubusercontent.com/aiffadev",
    githubUsername: "aiffadev",
    title: "Сообщество создателей и ревьюеров",
    direction: "Community",
    contributions: {
      lessons: 80,
      weeklyTasks: 40,
      projects: 24,
      reviews: 300,
    },
    areas: ["materials", "weekly", "projects", "hackathons", "articles", "support"],
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

export const creators: Creator[] = baseCreators.map((creator) => {
  const profileLinks: Creator["profileLinks"] = [...(creator.profileLinks ?? [])];

  if (creator.githubUsername) {
    const githubHref = `https://github.com/${creator.githubUsername}`;
    const hasGithubLink = profileLinks.some((link) => link.type === "github");

    if (!hasGithubLink) {
      profileLinks.push({
        type: "github",
        label: "GitHub",
        href: githubHref,
      });
    }
  }

  const avatar =
    creator.avatar ??
    (creator.githubUsername ? `https://avatars.githubusercontent.com/${creator.githubUsername}` : undefined);

  return {
    ...creator,
    avatar,
    profileLinks,
  };
});


