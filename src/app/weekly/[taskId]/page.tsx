import { Suspense } from "react";
import WeeklyTaskDetailPageClient from "./WeeklyTaskDetailPageClient";
import SeoStructuredData from "./SeoStructuredData";
import { normalizeWeeklyTaskId } from "./utils";

type WeeklyTaskRouteParams = {
  params:
    | { taskId: string }
    | Promise<{
        taskId: string;
      }>;
};

const WeeklyTaskDetailRoutePage = async ({ params }: WeeklyTaskRouteParams) => {
  // Пока сам TaskDetailScreen использует useParams из shim, поэтому просто монтируем client-компонент
  const resolvedParams = await Promise.resolve(params);
  const taskId = normalizeWeeklyTaskId(resolvedParams.taskId);

  return (
    <>
      <WeeklyTaskDetailPageClient taskId={taskId} />
      <Suspense fallback={null}>
        <SeoStructuredData taskId={taskId} />
      </Suspense>
    </>
  );
};

export default WeeklyTaskDetailRoutePage;


