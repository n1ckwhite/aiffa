export type BlogAuthor = {
  name: string;
  github?: string;
  url?: string;
  avatar?: string;
};

export type BlogArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  author: BlogAuthor;
  readingTime?: string;
  coverImage?: string;
  mdPath: string; // public path, e.g. /articles/my-post.md
};

export const blogArticles: BlogArticleMeta[] = [
  {
    slug: "kak-pisat-poleznye-stati-v-aiffa",
    title: "Как писать полезные статьи в AIFFA",
    description:
      "Набор простых принципов: структура, примеры, практика, и как сделать материал ценным для сообщества.",
    date: "2025-12-10",
    tags: ["AIFFA", "Сообщество", "Контент"],
    author: { name: "n1ckwhite", github: "n1ckwhite" },
    readingTime: "5 мин",
    coverImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
    mdPath: "/articles/kak-pisat-poleznye-stati-v-aiffa.md",
  },
  {
    slug: "git-pull-vs-fetch-na-praktike",
    title: "Git pull vs fetch — на практике и без мифов",
    description:
      "Разбираем, что реально происходит в репозитории, как читать историю, и какой командой пользоваться в разных ситуациях.",
    date: "2025-12-06",
    tags: ["Git", "Практика"],
    author: { name: "aiffadev", github: "aiffadev" },
    readingTime: "7 мин",
    coverImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    mdPath: "/articles/git-pull-vs-fetch-na-praktike.md",
  },
];

export const getBlogArticleBySlug = (slug: string): BlogArticleMeta | undefined => {
  return blogArticles.find((a) => a.slug === slug);
};


