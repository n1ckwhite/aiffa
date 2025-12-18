import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
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
  const safePage = Number.isFinite(pageNumber) && pageNumber > 1 ? pageNumber : 2;

  return {
    title: `Блог — страница ${safePage}`,
    description: "Статьи участников AIFFA: опыт, разборы и практические советы",
    alternates: {
      canonical: `${SITE_URL}/blog/${safePage}`,
    },
    openGraph: {
      url: `${SITE_URL}/blog/${safePage}`,
      title: `Блог — страница ${safePage} — AIFFA`,
      description: "Статьи участников AIFFA: опыт, разборы и практические советы",
      type: "website",
    },
  };
};

const BlogPaginatedRoutePage = ({ params }: PageProps) => {
  const pageNumber = Number.parseInt(params.page, 10);
  if (!Number.isFinite(pageNumber) || pageNumber <= 1) {
    redirect("/blog/1");
  }

  redirect(`/blog/${pageNumber}`);
};

export default BlogPaginatedRoutePage;


