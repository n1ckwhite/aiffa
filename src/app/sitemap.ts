import type { MetadataRoute } from "next";
import { loadManifest } from "shared/lessons/api";
import { weeklyManifest } from "shared/weekly/manifest";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/learn",
    "/weekly",
    "/hackathons",
    "/sessions",
    "/partners",
    "/profile",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const manifest = await loadManifest();

  const moduleRoutes: MetadataRoute.Sitemap = (manifest.modules || []).flatMap(
    (module: any) => {
      const moduleUrl = {
        url: `${SITE_URL}/learn/${module.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };

      const projectRoutes: MetadataRoute.Sitemap = module.project
        ? [
            {
              url: `${SITE_URL}/learn/${module.id}/projects`,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.6,
            },
            {
              url: `${SITE_URL}/learn/${module.id}/projects/${module.project.id}`,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.6,
            },
          ]
        : [];

      const lessonUrls: MetadataRoute.Sitemap = (module.lessons || []).flatMap(
        (lesson: any) => {
          const baseLessonUrl = `${SITE_URL}/learn/${module.id}/${lesson.id}`;

          return [
            {
              url: baseLessonUrl,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.6,
            },
            {
              url: `${baseLessonUrl}/tasks`,
              lastModified: now,
              changeFrequency: "monthly" as const,
              priority: 0.5,
            },
          ];
        }
      );

      return [moduleUrl, ...projectRoutes, ...lessonUrls];
    }
  );

  const weeklyRoutes: MetadataRoute.Sitemap = weeklyManifest.map((task) => ({
    url: `${SITE_URL}/weekly/${task.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...moduleRoutes, ...weeklyRoutes];
};

export default sitemap;


