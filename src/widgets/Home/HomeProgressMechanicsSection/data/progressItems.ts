import { FiBriefcase, FiEdit3, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import type { ProgressItem } from "../types";

export const progressItems: ProgressItem[] = [
  {
    id: "practice",
    title: "Практика и опыт",
    desc: "Регулярные задачи и разборы дают реальный опыт — не “учёба”, а практика как в работе.",
    icon: FiTarget,
    accent: {
      bgLight: "blue.50",
      bgDark: "rgba(59, 130, 246, 0.14)",
      fgLight: "blue.700",
      fgDark: "blue.200",
    },
  },
  {
    id: "hackathons",
    title: "Хакатоны и первые проекты бизнеса",
    desc: "Участие в хакатонах — это первые проекты от бизнеса и опыт работы в команде.",
    icon: FiBriefcase,
    accent: {
      bgLight: "green.50",
      bgDark: "rgba(16, 185, 129, 0.14)",
      fgLight: "green.700",
      fgDark: "green.200",
    },
  },
  {
    id: "teamwork",
    title: "Командная работа",
    desc: "Планирование, роли, ответственность и дедлайны — формируются привычки взрослой разработки.",
    icon: FiUsers,
    accent: {
      bgLight: "teal.50",
      bgDark: "rgba(20, 184, 166, 0.12)",
      fgLight: "teal.700",
      fgDark: "teal.200",
    },
  },
  {
    id: "content",
    title: "Статьи и вклад",
    desc: "Пишешь статьи, улучшаешь материалы и задачи — это видно и усиливает профиль.",
    icon: FiEdit3,
    accent: {
      bgLight: "purple.50",
      bgDark: "rgba(168, 85, 247, 0.14)",
      fgLight: "purple.700",
      fgDark: "purple.200",
    },
  },
  {
    id: "achievements",
    title: "XP и достижения",
    desc: "Награды и рост XP показывают стабильность и качество действий.",
    icon: FiTrendingUp,
    accent: {
      bgLight: "orange.50",
      bgDark: "rgba(249, 115, 22, 0.14)",
      fgLight: "orange.700",
      fgDark: "orange.200",
    },
  },
];
