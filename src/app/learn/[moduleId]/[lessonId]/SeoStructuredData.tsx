import React from "react";
import { loadLesson, loadManifest } from "shared/lessons/api";

type SeoStructuredDataProps = {
  moduleId: string;
  lessonId: string;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

/**
 * Server component: JSON-LD для урока.
 * Рендерится под <Suspense>, чтобы не блокировать первый paint основного контента.
 */
const SeoStructuredData = async ({ moduleId, lessonId }: SeoStructuredDataProps) => {
  const [lesson, manifest] = await Promise.all([loadLesson(moduleId, lessonId), loadManifest()]);
  const lessonAny = lesson as any;
  const moduleAny = (manifest.modules || []).find((mod: any) => mod.id === moduleId) as any;

  const url = `${SITE_URL}/learn/${moduleId}/${lessonId}`;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: lessonAny?.title ?? "Урок",
            description: lessonAny?.description,
            url,
            inLanguage: "ru-RU",
            author: (lessonAny?.authors || []).map((author: any) => ({
              "@type": "Person",
              name: author.name ?? author.username,
            })),
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
              { "@type": "ListItem", position: 2, name: "Материалы", item: `${SITE_URL}/learn` },
              {
                "@type": "ListItem",
                position: 3,
                name: moduleAny?.title ?? moduleId,
                item: `${SITE_URL}/learn/${moduleId}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: lessonAny?.title ?? lessonId,
                item: url,
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default SeoStructuredData;

