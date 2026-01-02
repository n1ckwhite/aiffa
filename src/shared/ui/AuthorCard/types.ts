export type AuthorCardAuthor = {
  username: string;
  name: string;
};

export type AuthorCardContext = "lesson" | "project";

export type AuthorCardProps = {
  author?: AuthorCardAuthor;
  borderColor: string;
  descColor: string;
  linkColor: string;
  starsCount?: number;
  viewsCount?: number;
  commentsCount?: number;
  isStarred?: boolean;
  onToggleStar?: () => void;
  context?: AuthorCardContext;
};


