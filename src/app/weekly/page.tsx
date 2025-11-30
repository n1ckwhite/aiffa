import React from "react";
import type { Metadata } from "next";
import WeeklyTasksPageClient from "./WeeklyTasksPageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Задачи недели — AIFFA",
  description: "Еженедельные практические задачи для прокачки навыков разработки",
  alternates: {
    canonical: `${SITE_URL}/weekly`,
  },
};

const WeeklyTasksRoute = () => {
  return <WeeklyTasksPageClient />;
};

export default WeeklyTasksRoute;



