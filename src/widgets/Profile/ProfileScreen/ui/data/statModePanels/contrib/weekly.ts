import { FiTarget } from "react-icons/fi";
import { weeklyTasksMock } from "../../weeklyTasksMock";
import type { StatModePanelConfig } from "../shared/types";

export const contribWeeklyPanel: StatModePanelConfig = {
  title: "Вложено задач недели",
  description: "Задачи недели, опубликованные вами.",
  icon: FiTarget,
  pagination: { pageSize: 3, ariaLabel: "Пагинация задач недели" },
  items: weeklyTasksMock.map((item) => ({
    ...item,
    status: "pending" as const,
  })),
};

