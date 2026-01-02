import React from "react";
import { loadManifest } from "shared/lessons/api";

/**
 * Важно для no-JS: если параметр не входит в generateStaticParams,
 * Next отдаёт обычный HTML 404 (а не dev error shell от notFound()).
 */
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const manifest = await loadManifest();
  return (manifest.modules || []).map((m) => ({ moduleId: m.id }));
};

const LearnModuleLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LearnModuleLayout;


