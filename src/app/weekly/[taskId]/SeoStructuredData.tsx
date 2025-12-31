import React from "react";
import path from "node:path";
import { promises as fs } from "node:fs";
import { getWeeklyInfoById } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";

type SeoStructuredDataProps = {
  taskId: string;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

/**
 * Server component: JSON-LD для задачи недели.
 * Рендерится под <Suspense>, чтобы не блокировать первый paint основного контента.
 */
const SeoStructuredData = async ({ taskId }: SeoStructuredDataProps) => {
  const info = getWeeklyInfoById(taskId);
  const url = `${SITE_URL}/weekly/${taskId}`;

  let title = "Задача недели";
  let description =
    "Еженедельная практическая задача для развития навыков программирования и инженерной культуры.";
  let authorName: string | undefined;

  if (info?.mdPath) {
    try {
      const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
      const filePath = path.join(process.cwd(), "public", relative);
      const md = await fs.readFile(filePath, "utf-8");
      const parsed = parseWeeklyTaskMd(md);
      if (parsed.title) title = parsed.title;
      if (parsed.description) description = parsed.description;
      if (parsed.author?.name) authorName = parsed.author.name;
    } catch {
      // ignore
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            url,
            inLanguage: "ru-RU",
            ...(authorName
              ? {
                  author: [{ "@type": "Person", name: authorName }],
                }
              : {}),
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Задачи недели", item: `${SITE_URL}/weekly` },
              { "@type": "ListItem", position: 3, name: title, item: url },
            ],
          }),
        }}
      />
    </>
  );
};

export default SeoStructuredData;


