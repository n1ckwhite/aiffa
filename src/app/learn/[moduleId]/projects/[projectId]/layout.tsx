import React from "react";
import { loadManifest } from "shared/lessons/api";

/**
 * No-JS friendly: неизвестный projectId не должен доходить до page.tsx с notFound().
 */
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const manifest = await loadManifest();
  return (manifest.modules || [])
    .filter((m) => Boolean((m as any).project?.id))
    .map((m) => ({ moduleId: m.id, projectId: (m as any).project.id as string }));
};

const LearnProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LearnProjectLayout;



