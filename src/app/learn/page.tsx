import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModulesPageClient from "./ModulesPageClient";

export const metadata: Metadata = {
  title: "Материалы — модули",
  description: "Список модулей курса JavaScript Universe"
};

const LearnRootRoute = async () => {
  // Для SEO можно принудительно прогреть manifest
  await loadManifest();
  return <ModulesPageClient />;
};

export default LearnRootRoute;



