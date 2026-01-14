import { FiEdit3 } from "react-icons/fi";
import type { StatModePanelConfig } from "../shared/types";

export const contribArticlesPanel: StatModePanelConfig = {
  title: "Написано статей",
  description: "Опубликованные вами статьи.",
  icon: FiEdit3,
  items: [
    { title: "Как писать полезные статьи", description: "Опубликовано · 2025", authorLabel: "AIFFA", authorHref: "/creators" },
    { title: "Next.js metadata SEO", description: "Опубликовано · 2025", authorLabel: "AIFFA", authorHref: "/creators" },
  ],
};

