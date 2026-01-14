import { FiPackage } from "react-icons/fi";
import type { StatModePanelConfig } from "../shared/types";

export const contribProjectsPanel: StatModePanelConfig = {
  title: "Вложено проектов",
  description: "Проекты по вашему авторству.",
  icon: FiPackage,
  items: [{ title: "Проект: базовый шаблон", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" }],
};

