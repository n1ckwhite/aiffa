import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

type BlogRoutePageProps = {
  searchParams?: {
    page?: string;
    q?: string;
    tag?: string;
  };
};

const getSafePage = (raw: unknown) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export const generateMetadata = async ({ searchParams }: BlogRoutePageProps): Promise<Metadata> => {
  const page = getSafePage(searchParams?.page);
  const isFirst = page <= 1;
  const canonicalUrl = isFirst ? `${SITE_URL}/blog` : `${SITE_URL}/blog?page=${page}`;

  return {
    title: isFirst ? "Блог" : `Блог — страница ${page}`,
    description: "Статьи участников AIFFA: опыт, разборы и практические советы",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: isFirst ? "Блог — AIFFA" : `Блог — страница ${page} — AIFFA`,
      description: "Статьи участников AIFFA: опыт, разборы и практические советы",
      type: "website",
    },
  };
};

const BlogRoutePage = ({ searchParams }: BlogRoutePageProps) => {
  const initialPage = getSafePage(searchParams?.page);
  const initialQuery = (searchParams?.q ?? "").toString();
  const initialTag = (searchParams?.tag ?? "").toString();

  return (
    <BlogPageClient
      initialPage={initialPage}
      initialQuery={initialQuery}
      initialTag={initialTag}
    />
  );
};

export default BlogRoutePage;


