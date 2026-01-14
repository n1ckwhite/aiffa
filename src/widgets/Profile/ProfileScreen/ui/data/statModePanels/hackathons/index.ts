import { FiAward } from "react-icons/fi";
import type { StatModePanelConfig } from "../shared/types";

export const hackathonsPanel: StatModePanelConfig = {
  title: "Хакатоны",
  description: "Ваше участие в хакатонах.",
  icon: FiAward,
  pagination: { pageSize: 3, ariaLabel: "Пагинация хакатонов" },
  items: [
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #1 — Задача старта",
      teamName: "Infra Wizards",
      place: 1,
      dateIso: "2025-11-18",
      taskDescription:
        "Собрать экран профиля с режимами статистики и списками: материалы, проекты и задачи недели. Упор на UX, доступность и аккуратную архитектуру компонентов.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Nick White", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/n1ckwhite?s=40" },
        { name: "PetePearl", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Roman Troitsky", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #1 — Задача старта",
      teamName: "UI Rangers",
      dateIso: "2025-12-02",
      taskDescription:
        "Сделать единый визуальный язык карточек (материалы/проекты/задачи недели) с корректной семантикой и кликабельностью без JS.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Nick White", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/n1ckwhite?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #1 — Задача старта",
      teamName: "Community Lab",
      place: 3,
      dateIso: "2025-12-05",
      taskDescription:
        "Придумать формат еженедельных мини‑ивентов и подготовить прототип: правила, шаблоны задач, сбор обратной связи и быстрые итерации.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "PetePearl", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Roman Troitsky", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #2 — Командный UI",
      teamName: "Type Safe",
      dateIso: "2026-01-20",
      taskDescription:
        "Собрать набор DX‑утилит: линт/проверки, генераторы и шаблоны, чтобы ускорить работу и снизить число ошибок на ревью.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Nick White", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/n1ckwhite?s=40" },
        { name: "PetePearl", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #2 — Командный UI",
      teamName: "Pixel Forge",
      dateIso: "2026-01-22",
      taskDescription:
        "Собрать дизайн‑систему карточек и состояний (loading/empty/error) и договориться о правилах: семантика, доступность, клики без JS.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Roman Troitsky", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #3 — Практика",
      teamName: "Shipping Squad",
      dateIso: "2026-03-11",
      taskDescription:
        "Подготовить практические задания (материалы/проекты/недельные задачи) с градацией сложности и метриками прогресса для профиля.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Nick White", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/n1ckwhite?s=40" },
        { name: "PetePearl", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Roman Troitsky", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #3 — Практика",
      teamName: "Mentor Crew",
      dateIso: "2026-03-14",
      taskDescription:
        "Запустить процесс ревью решений: чек‑листы, быстрые фидбеки, подбор ресурсов, чтобы улучшать качество решений и обучения.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Nick White", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/n1ckwhite?s=40" },
      ],
    },
    {
      cardVariant: "hackathon",
      title: "AIFFA Hackathon #4 — Экосистема",
      teamName: "Infra Guild",
      dateIso: "2026-05-02",
      taskDescription:
        "Улучшить инфраструктуру контента: сбор метаданных, генерация превью, единые правила ссылок и навигации по материалам.",
      members: [
        { name: "AIFFA", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "Roman Troitsky", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
        { name: "PetePearl", href: "/creators", avatarUrl: "https://avatars.githubusercontent.com/aiffa?s=40" },
      ],
    },
  ],
};

