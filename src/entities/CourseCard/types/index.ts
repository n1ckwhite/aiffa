export interface CourseCardProps {
  moduleId: string;
  title: string;
  description: string;
  lessonsCount: number;
  studyTime: string;
  level?: string;
  icon?: React.ReactNode;
  delay?: number;
  forceActive?: boolean;
  to?: string;
}


