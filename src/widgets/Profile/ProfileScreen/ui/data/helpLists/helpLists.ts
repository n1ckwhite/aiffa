import { HelpListItem } from "./types";

export const progressHelpList: HelpListItem[] = [
  {
    prefix: "- Продолжай обучение в разделе ",
    linkTo: "/learn",
    linkLabel: "Материалы",
    linkAriaLabel: "Открыть материалы",
    suffix: ".",
  },
  {
    prefix: "- Решай ",
    linkTo: "/weekly",
    linkLabel: "задачи недели",
    linkAriaLabel: "Открыть задачи недели",
    suffix: " и собирай достижения.",
  },
  {
    prefix: "- Читай ",
    linkTo: "/blog",
    linkLabel: "статьи",
    linkAriaLabel: "Открыть блог",
    suffix: " и прокачивай базу.",
  },
  {
    prefix: "- Участвуй в ",
    linkTo: "/hackathons",
    linkLabel: "хакатонах",
    linkAriaLabel: "Открыть хакатоны",
    suffix: " и сессиях.",
  },
];

export const contributionHelpList: HelpListItem[] = [
  {
    prefix: "- Публикуй ",
    linkTo: "/learn",
    linkLabel: "материалы",
    linkAriaLabel: "Открыть материалы",
    suffix: " — это учитывается как авторство в базе AIFFA.",
  },
  {
    prefix: "- Публикуй проекты",
    linkTo: "/learn",
    linkLabel: "",
    linkAriaLabel: "",
    suffix: " — это учитывается как авторство проектов.",
  },
  {
    prefix: "- Добавляй ",
    linkTo: "/weekly",
    linkLabel: "задачи недели",
    linkAriaLabel: "Открыть задачи недели",
    suffix: " — это учитывается как авторство задач недели.",
  },
  {
    prefix: "- Пиши ",
    linkTo: "/blog",
    linkLabel: "статьи",
    linkAriaLabel: "Открыть блог",
    suffix: " — это учитывается как авторство статей.",
  },
];


