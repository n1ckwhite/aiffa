import React from "react";
import { weeklyManifest } from "shared/weekly/manifest";

/**
 * No-JS friendly: неизвестный taskId не должен доходить до page.tsx с notFound(),
 * иначе в dev можно получить __next_error__ shell без видимой разметки.
 */
export const dynamicParams = false;

export const generateStaticParams = async () => {
  return (weeklyManifest || []).map((t) => ({ taskId: t.id }));
};

const WeeklyTaskLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default WeeklyTaskLayout;


