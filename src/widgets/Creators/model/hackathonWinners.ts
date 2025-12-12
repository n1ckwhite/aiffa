export type HackathonWinner = {
  id: string;
  teamName: string;
  place: 1 | 2 | 3;
  hackathonTitle: string;
  description: string;
  members: {
    id: string;
    name: string;
    profileHref: string;
    avatarSrc?: string;
  }[];
};

export const hackathonWinners: HackathonWinner[] = [
  {
    id: "team-aiffa-rocket",
    teamName: "AIFFA Rocket",
    place: 1,
    hackathonTitle: "AIFFA Hackathon #1 — Задача старта",
    description:
      "Команда, которая собрала прототип AI‑ассистента для задач недели и довела его до рабочего демо за два дня.",
    members: [
      {
        id: "nick-white",
        name: "Nick White",
        profileHref: "https://github.com/n1ckwhite",
        avatarSrc: "https://avatars.githubusercontent.com/n1ckwhite?s=80",
      },
      {
        id: "petepearl",
        name: "PetePearl",
        profileHref: "https://github.com/PetePearl",
        avatarSrc: "https://avatars.githubusercontent.com/PetePearl?s=80",
      },
      {
        id: "aiffa-dev",
        name: "AIFFA Dev",
        profileHref: "https://github.com/aiffadev",
        avatarSrc: "https://avatars.githubusercontent.com/aiffadev?s=80",
      },
    ],
  },
  {
    id: "team-type-safe",
    teamName: "Type Safe",
    place: 2,
    hackathonTitle: "AIFFA Hackathon #1 — Задача старта",
    description:
      "Собрали тулзы для разработчиков, которые помогают быстрее поднимать окружение и ловить ошибки ещё до PR.",
    members: [
      {
        id: "nick-white",
        name: "Nick White",
        profileHref: "https://github.com/n1ckwhite",
        avatarSrc: "https://avatars.githubusercontent.com/n1ckwhite?s=80",
      },
      {
        id: "community-lab",
        name: "Community Lab",
        profileHref: "https://github.com/aiffadev",
        avatarSrc: "https://avatars.githubusercontent.com/aiffadev?s=80",
      },
    ],
  },
  {
    id: "team-community-lab",
    teamName: "Community Lab",
    place: 3,
    hackathonTitle: "AIFFA Hackathon #1 — Задача старта",
    description:
      "Придумали и реализовали формат еженедельных мини‑ивентов, которые сейчас тестируются в AIFFA комьюнити.",
    members: [
      {
        id: "community-lab",
        name: "Community Lab",
        profileHref: "https://github.com/aiffadev",
        avatarSrc: "https://avatars.githubusercontent.com/aiffadev?s=80",
      },
    ],
  },
];


