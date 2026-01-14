import { FiBookOpen } from "react-icons/fi";
import type { StatModePanelConfig } from "../shared/types";

export const contribMaterialsPanel: StatModePanelConfig = {
  title: "Вложено материалов",
  description: "Материалы, добавленные/улучшенные вами.",
  icon: FiBookOpen,
  items: [
    { title: "Материал: Accessibility basics", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" },
    { title: "Материал: Docker dev setup", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" },
  ],
};

