"use client";

import TaskDetailScreen from "@/widgets/WeeklyTaskDetail/parts/TaskDetailScreen";
import React from "react";

type WeeklyTaskDetailPageClientProps = {
  taskId: string;
  initialMd?: string;
};

const WeeklyTaskDetailPageClient = ({ taskId, initialMd }: WeeklyTaskDetailPageClientProps) => {
  return <TaskDetailScreen taskId={taskId} initialMd={initialMd} />;
};

export default WeeklyTaskDetailPageClient;


