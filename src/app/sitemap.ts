import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    "",
    "/learn",
    "/weekly",
    "/partners",
    "/profile",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  return routes;
};

export default sitemap;


