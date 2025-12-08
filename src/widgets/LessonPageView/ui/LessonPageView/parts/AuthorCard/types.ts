export type AuthorCardProps = {
  author?: { username: string; name: string };
  borderColor: string;
  descColor: string;
  linkColor: string;
  starsCount?: number;
  viewsCount?: number;
  commentsCount?: number;
  isStarred?: boolean;
  onToggleStar?: () => void;
};


