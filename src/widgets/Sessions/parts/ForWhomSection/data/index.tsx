import { Icon } from "@chakra-ui/react";
import { FaComments, FaProjectDiagram, FaUserFriends } from "react-icons/fa";
import type { SessionsForWhomCard } from "../types";

export const useSessionsForWhomCards = (): SessionsForWhomCard[] => [
  {
    id: "start-it",
    title: "Понять, с чего начать и куда идти",
    subtitle: "Старт в IT",
    description:
      "Разбираем роли, стеки и реальные задачи, чтобы собрать для тебя понятный маршрут: от первых шагов до уверенного джуна.",
    icon: <Icon as={FaComments} boxSize={3} />,
  },
  {
    id: "own-project",
    title: "Показать проект и получить разбор",
    subtitle: "Свой проект",
    description:
      "Приходишь со своим pet‑проектом или рабочей задачей — вместе смотрим код, архитектуру и обсуждаем, что улучшить и как двигаться дальше.",
    icon: <Icon as={FaProjectDiagram} boxSize={3} />,
  },
  {
    id: "people-teams",
    title: "Найти своих и видеть, как решают задачи другие",
    subtitle: "Люди и команды",
    description:
      "Знакомишься с ребятами, смотришь чужие решения, собираешь команду под хакатон или долгий проект и не варишься в одиночестве.",
    icon: <Icon as={FaUserFriends} boxSize={3} />,
  },
];


