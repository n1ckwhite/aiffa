import React from "react";
import { loadManifest } from "shared/lessons/api";

/**
 * No-JS friendly: неизвестный lessonId не должен доходить до page.tsx с notFound(),
 * иначе в dev можно получить __next_error__ shell без видимой разметки.
 */
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const manifest = await loadManifest();
  return (manifest.modules || []).flatMap((m) =>
    (m.lessons || []).map((l) => ({ moduleId: m.id, lessonId: l.id })),
  );
};

const LearnLessonLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LearnLessonLayout;


