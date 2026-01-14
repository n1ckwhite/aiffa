import { FiVideo } from "react-icons/fi";
import { FaComments, FaMicrophoneAlt, FaProjectDiagram, FaHandshake } from "react-icons/fa";
import type { StatModePanelConfig } from "../shared/types";

export const sessionsPanel: StatModePanelConfig = {
  title: "Сессии",
  description: "Посещённые сессии.",
  icon: FiVideo,
  pagination: { pageSize: 3, ariaLabel: "Пагинация сессий" },
  items: [
    {
      cardVariant: "session",
      title: "Знакомство",
      dateTime: "2025-05-01T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Онлайн‑знакомство с форматом и людьми, мягкий вход в комьюнити: рассказываем, как всё устроено, знакомимся и обозначаем цели на ближайшие месяцы.",
      icon: FaComments as any,
    },
    {
      cardVariant: "session",
      title: "AMA",
      dateTime: "2025-05-08T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "AMA‑сессия: можно задать любые вопросы про обучение, карьеру и проекты, узнать, как другие решают похожие задачи и куда двигаться дальше.",
      icon: FaMicrophoneAlt as any,
    },
    {
      cardVariant: "session",
      title: "Разбор проектов",
      dateTime: "2025-05-15T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Показываем pet‑проекты участников: вместе смотрим код, архитектуру и UX, обсуждаем улучшения и следующие шаги по развитию проекта.",
      icon: FaProjectDiagram as any,
    },
    {
      cardVariant: "session",
      title: "Networking",
      dateTime: "2025-05-22T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Неформальное общение: знакомимся, ищем команду под хакатоны и долгие проекты, находим людей с похожими целями и интересами.",
      icon: FaHandshake as any,
    },
    {
      cardVariant: "session",
      title: "Разбор задач недели",
      dateTime: "2025-06-05T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Разбираем решения задач недели: подходы, типовые ошибки, как улучшить читаемость и устойчивость решения.",
      icon: FaProjectDiagram as any,
    },
    {
      cardVariant: "session",
      title: "Q&A: обучение и roadmap",
      dateTime: "2025-06-12T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Вопросы и ответы: как выбрать следующий модуль, что повторить, как не выгореть и выстроить регулярность.",
      icon: FaMicrophoneAlt as any,
    },
    {
      cardVariant: "session",
      title: "Разбор резюме",
      dateTime: "2025-06-19T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Смотрим резюме и портфолио: что убрать, что усилить, как описывать опыт и проекты, чтобы было понятно рекрутеру.",
      icon: FaComments as any,
    },
    {
      cardVariant: "session",
      title: "Networking: команда и проекты",
      dateTime: "2025-06-26T19:00:00+03:00",
      timeLabel: "Онлайн · 19:00 МСК",
      description:
        "Неформальная встреча: ищем команду под хакатоны и долгие проекты, знакомимся и делимся целями.",
      icon: FaHandshake as any,
    },
  ],
};

