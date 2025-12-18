import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPageClient from "../BlogPageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

type PageProps = {
  params: {
    page: string;
  };
};

const parsePage = (raw: string): number | null => {
  const value = (raw ?? "").trim();
  if (!/^\d+$/.test(value)) return null;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const parsed = parsePage(params.page);
  if (!parsed) {
    return {
      title: "Блог",
      description: "Статьи участников AIFFA: опыт, разборы и практические советы",
      alternates: { canonical: `${SITE_URL}/blog/1` },
    };
  }

  return {
    title: parsed === 1 ? "Блог" : `Блог — страница ${parsed}`,
    description: "Статьи участников AIFFA: опыт, разборы и практические советы",
    alternates: {
      canonical: `${SITE_URL}/blog/${parsed}`,
    },
    openGraph: {
      url: `${SITE_URL}/blog/${parsed}`,
      title: parsed === 1 ? "Блог — AIFFA" : `Блог — страница ${parsed} — AIFFA`,
      description: "Статьи участников AIFFA: опыт, разборы и практические советы",
      type: "website",
    },
  };
};

const BlogNumericPageRoute = ({ params }: PageProps) => {
  const parsed = parsePage(params.page);
  if (!parsed) {
    notFound();
  }

  return <BlogPageClient />;
};

export default BlogNumericPageRoute;


