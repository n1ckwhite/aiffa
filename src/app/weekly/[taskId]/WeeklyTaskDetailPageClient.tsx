"use client";

import React from "react";
import TaskDetailScreen from "widgets/WeeklyTaskDetail/parts/TaskDetailScreen/TaskDetailScreen";

type WeeklyTaskDetailPageClientProps = {
  taskId: string;
};

const WeeklyTaskDetailPageClient = (_props: WeeklyTaskDetailPageClientProps) => {
  // taskId по-прежнему берётся из useParams внутри useTaskDetail через shim react-router-dom
  return <TaskDetailScreen />;
};

export default WeeklyTaskDetailPageClient;


