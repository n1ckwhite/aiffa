import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи участников AIFFA: опыт, разборы и практические советы",
  alternates: {
    canonical: `${SITE_URL}/blog/page1`,
  },
  openGraph: {
    url: `${SITE_URL}/blog/page1`,
    title: "Блог — AIFFA",
    description: "Статьи участников AIFFA: опыт, разборы и практические советы",
    type: "website",
  },
};

const BlogRoutePage = () => {
  redirect("/blog/page1");
};

export default BlogRoutePage;


