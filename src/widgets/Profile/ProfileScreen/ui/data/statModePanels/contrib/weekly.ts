import { FaClipboardList } from "react-icons/fa";
import { weeklyTasksMock } from "../../weeklyTasksMock";
import type { StatModePanelConfig } from "../shared/types";

export const contribWeeklyPanel: StatModePanelConfig = {
  title: "Вложено задач недели",
  description: "Задачи недели, опубликованные вами.",
  icon: FaClipboardList,
  pagination: { pageSize: 3, ariaLabel: "Пагинация задач недели" },
  items: weeklyTasksMock.map((item) => ({
    ...item,
    status: "pending" as const,
  })),
};

