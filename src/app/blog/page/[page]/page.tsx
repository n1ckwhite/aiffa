import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPageClient from "../../BlogPageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

type PageProps = {
  params: {
    page: string;
  };
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const pageNumber = Number.parseInt(params.page, 10);
  const safePage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  return {
    title: safePage === 1 ? "Блог" : `Блог — страница ${safePage}`,
    description: "Статьи участников AIFFA: опыт, разборы и практические советы",
    alternates: {
      canonical: safePage === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${safePage}`,
    },
    openGraph: {
      url: safePage === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${safePage}`,
      title: safePage === 1 ? "Блог — AIFFA" : `Блог — страница ${safePage} — AIFFA`,
      description: "Статьи участников AIFFA: опыт, разборы и практические советы",
      type: "website",
    },
  };
};

const BlogPaginatedRoutePage = ({ params }: PageProps) => {
  const pageNumber = Number.parseInt(params.page, 10);
  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    notFound();
  }
  return <BlogPageClient />;
};

export default BlogPaginatedRoutePage;


