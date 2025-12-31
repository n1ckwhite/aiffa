import React from "react";
import { loadWeeklyMeta, normalizeWeeklyTaskId } from "./utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

type WeeklyTaskHeadProps = {
  params:
    | { taskId: string }
    | Promise<{
        taskId: string;
      }>;
};

// Next will render this inside real <head>, which Lighthouse expects.
const Head = async ({ params }: WeeklyTaskHeadProps) => {
  const resolvedParams = await Promise.resolve(params);
  const taskId = normalizeWeeklyTaskId(resolvedParams.taskId);
  const url = `${SITE_URL}/weekly/${taskId}`;

  const meta = await loadWeeklyMeta(taskId);

  const title = meta.title;
  const description = meta.description;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

export default Head;


