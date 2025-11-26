import React from "react";
import type { Metadata } from "next";
import WeeklyTasksPageClient from "./WeeklyTasksPageClient";

export const metadata: Metadata = {
  title: "Задачи недели — AIFFA",
  description: "Еженедельные практические задачи для прокачки навыков разработки"
};

const WeeklyTasksRoute = () => {
  return <WeeklyTasksPageClient />;
};

export default WeeklyTasksRoute;



