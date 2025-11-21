"use client";

import TaskDetailScreen from "@/widgets/WeeklyTaskDetail/parts/TaskDetailScreen";
import React from "react";

type WeeklyTaskDetailPageClientProps = {
  taskId: string;
};

const WeeklyTaskDetailPageClient = ({ taskId }: WeeklyTaskDetailPageClientProps) => {
  return <TaskDetailScreen taskId={taskId} />;
};

export default WeeklyTaskDetailPageClient;


