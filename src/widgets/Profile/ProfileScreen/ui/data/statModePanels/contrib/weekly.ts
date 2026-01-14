import { FiTarget } from "react-icons/fi";
import type { StatModePanelConfig } from "../shared/types";

export const contribWeeklyPanel: StatModePanelConfig = {
  title: "Вложено задач недели",
  description: "Задачи недели, опубликованные вами.",
  icon: FiTarget,
  items: [
    { title: "Задача недели: замыкания", description: "Опубликовано", authorLabel: "AIFFA", authorHref: "/creators" },
    { title: "Задача недели: промисы", description: "Опубликовано", authorLabel: "AIFFA", authorHref: "/creators" },
  ],
};

