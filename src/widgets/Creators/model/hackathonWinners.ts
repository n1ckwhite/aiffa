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
      {
        id: "torvalds",
        name: "torvalds",
        profileHref: "https://github.com/torvalds",
        avatarSrc: "https://avatars.githubusercontent.com/torvalds?s=80",
      },
      {
        id: "gaearon",
        name: "gaearon",
        profileHref: "https://github.com/gaearon",
        avatarSrc: "https://avatars.githubusercontent.com/gaearon?s=80",
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
        id: "sindresorhus",
        name: "sindresorhus",
        profileHref: "https://github.com/sindresorhus",
        avatarSrc: "https://avatars.githubusercontent.com/sindresorhus?s=80",
      },
      {
        id: "yyx990803",
        name: "yyx990803",
        profileHref: "https://github.com/yyx990803",
        avatarSrc: "https://avatars.githubusercontent.com/yyx990803?s=80",
      },
      {
        id: "mrdoob",
        name: "mrdoob",
        profileHref: "https://github.com/mrdoob",
        avatarSrc: "https://avatars.githubusercontent.com/mrdoob?s=80",
      },
      {
        id: "paulirish",
        name: "paulirish",
        profileHref: "https://github.com/paulirish",
        avatarSrc: "https://avatars.githubusercontent.com/paulirish?s=80",
      },
      {
        id: "hadley",
        name: "hadley",
        profileHref: "https://github.com/hadley",
        avatarSrc: "https://avatars.githubusercontent.com/hadley?s=80",
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
        id: "tj",
        name: "tj",
        profileHref: "https://github.com/tj",
        avatarSrc: "https://avatars.githubusercontent.com/tj?s=80",
      },
      {
        id: "defunkt",
        name: "defunkt",
        profileHref: "https://github.com/defunkt",
        avatarSrc: "https://avatars.githubusercontent.com/defunkt?s=80",
      },
      {
        id: "mojombo",
        name: "mojombo",
        profileHref: "https://github.com/mojombo",
        avatarSrc: "https://avatars.githubusercontent.com/mojombo?s=80",
      },
      {
        id: "jashkenas",
        name: "jashkenas",
        profileHref: "https://github.com/jashkenas",
        avatarSrc: "https://avatars.githubusercontent.com/jashkenas?s=80",
      },
      {
        id: "bkeepers",
        name: "bkeepers",
        profileHref: "https://github.com/bkeepers",
        avatarSrc: "https://avatars.githubusercontent.com/bkeepers?s=80",
      },
    ],
  },
];


