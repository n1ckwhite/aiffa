"use client";

import React from "react";
import WeeklyTasksScreen from "widgets/WeeklyTasks/parts/Screen";
import type { WeeklyTaskInitialMeta } from "shared/weekly/types/initial";

type WeeklyTasksPageClientProps = {
  initialTasks?: WeeklyTaskInitialMeta[];
};

const WeeklyTasksPageClient = ({ initialTasks }: WeeklyTasksPageClientProps) => {
  return <WeeklyTasksScreen initialTasks={initialTasks} />;
};

export default WeeklyTasksPageClient;


