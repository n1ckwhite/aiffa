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
    viewsCount?: number;
    starsCount?: number;
    commentsCount?: number;
    readingTime?: string;
    coverImage?: string;
    mdPath: string; // public path, e.g. /articles/my-post.md
  };