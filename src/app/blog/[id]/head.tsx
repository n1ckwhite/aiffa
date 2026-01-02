import { getBlogArticleOrNull, SITE_URL } from "./utils";

const BlogArticleHead = async ({ params }: { params: { id: string } }) => {
  const id = (params?.id ?? "").toString();
  const article = getBlogArticleOrNull(id);
  if (!article) return null;

  const title = article.title.includes("AIFFA") ? article.title : `${article.title} — AIFFA`;
  const description = article.description || "Статья в блоге AIFFA";
  const canonicalUrl = `${SITE_URL}/blog/${article.id}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
};

export default BlogArticleHead;


