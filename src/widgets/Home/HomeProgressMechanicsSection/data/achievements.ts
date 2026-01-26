import { FaBookOpen, FaCalendarCheck, FaCircleCheck, FaListCheck, FaMessage } from "react-icons/fa6";
import type { AchievementItem } from "../types";

export const achievements: AchievementItem[] = [
  {
    id: "first-task",
    label: "Первая задача",
    icon: FaCircleCheck,
    from: "#93c5fd",
    to: "#3b82f6",
    color: "#60a5fa",
  },
  {
    id: "five-tasks",
    label: "5 задач",
    icon: FaListCheck,
    from: "#c4b5fd",
    to: "#8b5cf6",
    color: "#a78bfa",
  },
  {
    id: "streak-7",
    label: "Серия 7 дней",
    icon: FaCalendarCheck,
    from: "#a3e635",
    to: "#84cc16",
    color: "#84cc16",
  },
  {
    id: "reader",
    label: "1 материал",
    icon: FaBookOpen,
    from: "#7dd3fc",
    to: "#38bdf8",
    color: "#38bdf8",
  },
  {
    id: "feedback",
    label: "Отзыв",
    icon: FaMessage,
    from: "#fda4af",
    to: "#fb7185",
    color: "#fb7185",
  },
];
