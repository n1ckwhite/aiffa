export interface StageBreadcrumbProps {
    moduleId: string;
    moduleTitle: string;
    lessonId: string;
    lessonTitle: string;
    current?: 'lesson' | 'tasks';
    rootCrumb?: { label: string; to: string };
    middleCrumb?: { label: string; to: string };
  };