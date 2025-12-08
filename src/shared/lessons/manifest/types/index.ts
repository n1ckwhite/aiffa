export type LessonTask = {
  id: string;
  title: string;
  description?: string;
  type?: 'terminal' | 'mcq' | 'checkbox' | 'text';
  authors?: Array<{ username: string; name: string }>;
  terminal?: {
    placeholder?: string;
    expected?: string[];
    includes?: string[];
  };
  mcq?: {
    options: { id: string; label: string }[];
    correctId: string;
  };
  checkbox?: {
    options: { id: string; label: string }[];
    correctIds: string[];
  };
  text?: {
    placeholder?: string;
    allowed: string[];
  };
};

export type Lesson = {
  id: string;
  title: string;
  mdPath: string;
  tasks?: LessonTask[];
  durationMin?: number;
  authors?: Array<{ username: string; name: string }>;
  rating?: number;
  ratingCount?: number;
  views?: number;
  commentsCount?: number;
};

export type ModuleProject = {
  id: string;
  title: string;
  mdPath: string;
  repoUrl?: string;
  authors?: Array<{ username: string; name: string }>;
  ratingCount?: number;
  views?: number;
  commentsCount?: number;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
  project?: ModuleProject;
};

export type CourseManifest = {
  modules: Module[];
};


