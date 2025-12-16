import React from "react";
import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Блог — AIFFA",
  description: "Статьи участников AIFFA: опыт, разборы и практические советы",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    url: `${SITE_URL}/blog`,
    title: "Блог — AIFFA",
    description: "Статьи участников AIFFA: опыт, разборы и практические советы",
    type: "website",
  },
};

const BlogRoutePage = () => {
  return <BlogPageClient />;
};

export default BlogRoutePage;


