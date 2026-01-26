import { FiBarChart2, FiLayers, FiMessageCircle, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import type { BusinessHighlight } from "../types/highlight";

export const businessContent = {
  header: {
    badge: "Партнёрство для компаний",
    title: "AIFFA помогает нанимать быстрее и точнее",
    description:
      "Подключите реальную практику и получите поток кандидатов с живым кодом и понятными метриками. Видно, кто решает, как растёт и насколько стабилен — без догадок и долгих тестов.",
    linkLabel: "Стать партнёром",
    linkTo: "/partners",
  },
  highlights: [
    {
      title: "Тестовые задания под ваш стек",
      desc: "Weekly‑задачи и хакатоны на React/Next.js/ИИ — код пишется прямо на платформе, а не в вакууме.",
      icon: FiLayers,
    },
    {
      title: "Топ‑кандидаты по действиям",
      desc: "Сортировка по XP, решениям и ревью. Профили = резюме с живым кодом и историей роста.",
      icon: FiTrendingUp,
    },
    {
      title: "Аналитика команд",
      desc: "Отчёты: completion rate, retention, active users. Видно, кто растёт, а кто стоит.",
      icon: FiBarChart2,
    },
    {
      title: "Скорость подбора",
      desc: "Задачи закрываются за 2–3 дня — вы быстрее выходите на собеседования и офферы.",
      icon: FiZap,
    },
    {
      title: "Пул разработчиков",
      desc: "120+ активных участников и растущая база — можно запускать регулярные наборы.",
      icon: FiUsers,
    },
    {
      title: "Гибкие форматы",
      desc: "Пилоты, челленджи, хакатоны и спец‑проекты — собираем формат под вашу цель.",
      icon: FiMessageCircle,
    },
  ] satisfies BusinessHighlight[],
};
