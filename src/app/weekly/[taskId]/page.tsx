import { Suspense } from "react";
import path from "node:path";
import { promises as fs } from "node:fs";
import { notFound } from "next/navigation";
import WeeklyTaskDetailPageClient from "./WeeklyTaskDetailPageClient";
import SeoStructuredData from "./SeoStructuredData";
import { normalizeWeeklyTaskId } from "./utils";
import { getWeeklyInfoById } from "shared/weekly/manifest";

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
  if (!taskId) return notFound();

  const info = getWeeklyInfoById(taskId);
  if (!info?.mdPath) return notFound();

  // Читаем md на сервере и передаем в client, чтобы страница рендерилась без скелетона.
  let initialMd = "";
  try {
    const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
    const filePath = path.join(process.cwd(), "public", relative);
    initialMd = await fs.readFile(filePath, "utf-8");
  } catch {
    return notFound();
  }

  return (
    <>
      <WeeklyTaskDetailPageClient taskId={taskId} initialMd={initialMd} />
      <Suspense fallback={null}>
        <SeoStructuredData taskId={taskId} />
      </Suspense>
    </>
  );
};

export default WeeklyTaskDetailRoutePage;


