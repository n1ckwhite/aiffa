export type AuthorNoteProps = {
  taskId?: string;
  name: string;
  href: string;
  avatar?: string;
  note: string;
  starsCount?: number;
  commentsCount?: number;
  solvedCount?: number;
};