export interface CourseCardProps {
  moduleId: string;
  title: string;
  description: string;
  lessonsCount: number;
  studyTime: string;
  starsCount: number;
  views: number;
  commentsCount: number;
  topAuthors: { username: string; name: string; stars: number }[];
  otherAuthorsCount: number;
  level?: string;
  icon?: React.ReactNode;
  forceActive?: boolean;
  to?: string;
}


