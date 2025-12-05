import { Icon } from "@chakra-ui/react";
import { FaComments, FaHandshake, FaMicrophoneAlt, FaProjectDiagram } from "react-icons/fa";
import type { UpcomingSession } from "../types";

export const useSessionsUpcomingSessions = (): UpcomingSession[] => [
  {
    id: "2025-05-01-intro",
    dateLabel: "1 мая — знакомство",
    dateTime: "2025-05-01T19:00:00+03:00",
    description:
      "Онлайн‑знакомство с форматом и людьми, мягкий вход в комьюнити: рассказываем, как всё устроено, знакомимся и обозначаем цели на ближайшие месяцы.",
    icon: <Icon as={FaComments} />,
  },
  {
    id: "2025-05-08-ama",
    dateLabel: "8 мая — AMA",
    dateTime: "2025-05-08T19:00:00+03:00",
    description:
      "AMA‑сессия: можно задать любые вопросы про обучение, карьеру и проекты, узнать, как другие решают похожие задачи и куда двигаться дальше.",
    icon: <Icon as={FaMicrophoneAlt} />,
  },
  {
    id: "2025-05-15-project-review",
    dateLabel: "15 мая — разбор проектов",
    dateTime: "2025-05-15T19:00:00+03:00",
    description:
      "Показываем pet‑проекты участников: вместе смотрим код, архитектуру и UX, обсуждаем улучшения и следующие шаги по развитию проекта.",
    icon: <Icon as={FaProjectDiagram} />,
  },
  {
    id: "2025-05-22-networking",
    dateLabel: "22 мая — networking",
    dateTime: "2025-05-22T19:00:00+03:00",
    description:
      "Неформальное общение: знакомимся, ищем команду под хакатоны и долгие проекты, находим людей с похожими целями и интересами.",
    icon: <Icon as={FaHandshake} />,
  },
];


