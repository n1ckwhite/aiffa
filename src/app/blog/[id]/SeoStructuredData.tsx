import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import { SITE_URL } from "./utils";

type SeoStructuredDataProps = {
  article: BlogArticleMeta;
};

const SeoStructuredData = async ({ article }: SeoStructuredDataProps) => {
  const url = `${SITE_URL}/blog/${article.id}`;
  const authorUrl = article.author?.github ? `https://github.com/${article.author.github}` : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            url,
            datePublished: article.date,
            inLanguage: "ru-RU",
            ...(article.coverImage
              ? {
                  image: [
                    article.coverImage.startsWith("http")
                      ? article.coverImage
                      : `${SITE_URL}${article.coverImage}`,
                  ],
                }
              : {}),
            ...(article.author?.name
              ? {
                  author: {
                    "@type": "Person",
                    name: article.author.name,
                    ...(authorUrl ? { url: authorUrl } : {}),
                  },
                }
              : {}),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          }),
        }}
      />
    </>
  );
};

export default SeoStructuredData;


