export type BlogArticleParsed = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  author?: {
    name?: string;
    github?: string;
    url?: string;
    avatar?: string;
  };
  readingTime?: string;
  coverImage?: string;
};

export const splitBlogArticleMarkdown = (md: string): { meta: any; body: string } => {
  const normalized = md.replace(/^\uFEFF/, "");
  const fmMatch = normalized.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!fmMatch) {
    return { meta: {}, body: normalized };
  }
  const jsonText = fmMatch[1].trim();
  let meta: any = {};
  try {
    meta = JSON.parse(jsonText);
  } catch {
    meta = {};
  }
  const bodyRaw = normalized.slice(fmMatch[0].length);
  const body = bodyRaw
    .replace(/^\s*---\s*\r?\n\{[\s\S]*?\}\r?\n---\s*\r?\n?/m, "")
    .replace(/\r?\n---\s*\r?\n\{[\s\S]*?\}\r?\n---\s*\r?\n?/g, "\n");
  return { meta, body };
};

const extractTitleFromBody = (body: string): string => {
  const m = body.match(/^\s*#\s+(.+?)\s*$/m);
  return m?.[1]?.trim() ?? "";
};

const extractDescriptionFromBody = (body: string): string => {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/#+\s+.*$/gm, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 180);
};

export const parseBlogArticleMd = (md: string): BlogArticleParsed => {
  const { meta, body } = splitBlogArticleMarkdown(md);

  const title = String(meta.title || "").trim() || extractTitleFromBody(body);
  const description = String(meta.description || "").trim() || extractDescriptionFromBody(body);
  const slug = String(meta.slug || "").trim();

  const date = meta.date ? String(meta.date).trim() : undefined;
  const tags = Array.isArray(meta.tags) ? meta.tags.map((t: any) => String(t)).filter(Boolean) : undefined;
  const readingTime = meta.readingTime ? String(meta.readingTime).trim() : undefined;
  const coverImage = meta.coverImage ? String(meta.coverImage).trim() : undefined;
  const author = meta.author
    ? {
        name: meta.author?.name ? String(meta.author.name).trim() : undefined,
        github: meta.author?.github ? String(meta.author.github).trim() : undefined,
        url: meta.author?.url ? String(meta.author.url).trim() : undefined,
        avatar: meta.author?.avatar ? String(meta.author.avatar).trim() : undefined,
      }
    : undefined;

  return { slug, title, description, date, tags, author, readingTime, coverImage };
};


