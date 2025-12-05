import { Icon } from "@chakra-ui/react";
import {
  FaComments,
  FaHandshake,
  FaMapMarkerAlt,
  FaMicrophoneAlt,
  FaProjectDiagram,
  FaQuestionCircle,
  FaUserFriends,
} from "react-icons/fa";
import type { SessionFormatCardProps } from "../types";

export const useSessionsFormatCards = (): SessionFormatCardProps[] => [
  {
    icon: <Icon as={FaComments} />,
    title: "Встречи",
    description:
      "Онлайн‑встречи и созвоны по конкретным темам: от практических задач до обсуждения маршрута развития.",
  },
  {
    icon: <Icon as={FaUserFriends} />,
    title: "Консультации",
    description:
      "Точечные консультации по коду, архитектуре, карьере или учебному маршруту, когда нужен детальный разбор.",
  },
  {
    icon: <Icon as={FaQuestionCircle} />,
    title: "Q&A",
    description:
      "Сессии вопросов и ответов, где можно задать любые рабочие вопросы по задачам, технологиям и формату обучения.",
  },
  {
    icon: <Icon as={FaMicrophoneAlt} />,
    title: "AMA (Ask Me Anything)",
    description:
      "Открытые AMA‑форматы с экспертами, где вы задаёте вопросы вживую и получаете честные ответы про путь и практику.",
  },
  {
    icon: <Icon as={FaProjectDiagram} />,
    title: "Разборы проектов",
    description:
      "Показываем проекты участников и вместе разбираем архитектуру, код, UX и подход к решению задачи.",
  },
  {
    icon: <Icon as={FaHandshake} />,
    title: "Networking",
    description:
      "Формат для знакомства с другими участниками, поиска команды, коллег и людей с похожими целями.",
  },
  {
    icon: <Icon as={FaMapMarkerAlt} />,
    title: "Offline Meetups",
    description:
      "Встречи офлайн, когда это возможно: живое общение, мини‑доклады и обсуждения вокруг практики и проектов.",
  },
];


