import { Icon } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import type { EventDetailCardProps } from "../types";

export const useSessionsFirstSessionDetailsCards = (): EventDetailCardProps[] => [
  {
    icon: <Icon as={FaQuestionCircle} />,
    title: "О мероприятии",
    description:
      "Это мягкое знакомство с комьюнити AIFFA: расскажем, как устроен проект, какие форматы есть сейчас и как из них собрать маршрут под себя. Участники коротко представятся и смогут обозначить свои цели на ближайшие месяцы.",
  },
  {
    icon: <Icon as={SiGooglemeet} />,
    title: "Как присоединиться",
    description:
      "Регистрации не нужно: просто заходите в Telegram‑сообщество AIFFA, следите за анонсом и подключайтесь по ссылке на Google Meet в указанное время. Если не успели на первую встречу — сможете присоединиться к следующим сессиям.",
  },
];


