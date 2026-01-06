import { FaBookOpen, FaClipboardList, FaComments, FaCode, FaFeatherAlt } from "react-icons/fa";
import { QuickActionItem } from "./types";

export const progressQuickActions: QuickActionItem[] = [
  { id: "learn", to: "/learn", label: "К материалам", ariaLabel: "Перейти к материалам", icon: FaBookOpen },
  { id: "weekly", to: "/weekly", label: "Задачи недели", ariaLabel: "Перейти к задачам недели", icon: FaClipboardList },
  { id: "blog", to: "/blog", label: "Блог", ariaLabel: "Перейти к блогу", icon: FaFeatherAlt },
];

export const contributionQuickActions: QuickActionItem[] = [
  { id: "write", to: "/blog", label: "Написать", ariaLabel: "Перейти в блог", icon: FaFeatherAlt },
  { id: "learn", to: "/learn", label: "Материалы", ariaLabel: "Перейти к материалам", icon: FaBookOpen },
  { id: "weekly", to: "/weekly", label: "Задачи недели", ariaLabel: "Перейти к задачам недели", icon: FaClipboardList },
  { id: "hackathons", to: "/hackathons", label: "Хакатоны", ariaLabel: "Перейти к хакатонам", icon: FaCode },
  { id: "sessions", to: "/sessions", label: "Сессии", ariaLabel: "Перейти к сессиям", icon: FaComments },
];


