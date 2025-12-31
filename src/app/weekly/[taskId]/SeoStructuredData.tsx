import React from "react";
import { loadWeeklyMeta } from "./utils";

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
  const url = `${SITE_URL}/weekly/${taskId}`;

  const meta = await loadWeeklyMeta(taskId);
  const title = meta.title;
  const description = meta.description;
  const authorName = meta.authorName;

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


