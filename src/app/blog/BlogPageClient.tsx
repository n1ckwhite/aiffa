"use client";

import React from "react";
import BlogScreen from "@/widgets/Blog/parts/Screen/BlogScreen";

type BlogPageClientProps = {
  initialPage?: number;
  initialQuery?: string;
  initialTag?: string;
};

const BlogPageClient = ({ initialPage, initialQuery, initialTag }: BlogPageClientProps) => {
  return (
    <BlogScreen
      initialPage={initialPage}
      initialQuery={initialQuery}
      initialTag={initialTag}
    />
  );
};

export default BlogPageClient;


