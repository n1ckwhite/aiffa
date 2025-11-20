import React from "react";
import type { Metadata } from "next";
import WeeklyTasksPageClient from "./WeeklyTasksPageClient";

export const metadata: Metadata = {
  title: "Задачи недели — JavaScript Universe",
  description: "Еженедельные практические задачи для прокачки навыков разработки"
};

const WeeklyTasksRoute = () => {
  return <WeeklyTasksPageClient />;
};

export default WeeklyTasksRoute;



