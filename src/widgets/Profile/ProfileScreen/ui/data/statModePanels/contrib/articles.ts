import { FiEdit3 } from "react-icons/fi";
import { blogArticles } from "@/shared/articles/manifest";
import type { StatModePanelConfig } from "../shared/types";

export const contribArticlesPanel: StatModePanelConfig = {
  title: "Написано статей",
  description: "Опубликованные вами статьи.",
  icon: FiEdit3,
  pagination: { pageSize: 4 },
  items: blogArticles.slice(0, 6).map((article) => ({
    cardVariant: "article" as const,
    article,
    status: "pending" as const,
  })),
};

