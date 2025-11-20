import type React from 'react';
import type { Category } from '../../CourseGrid/types';

export type CourseLevel = 'Начальный' | 'Средний' | 'Продвинутый';

export type CourseItem = {
  id: number;
  moduleId: string;
  category: Exclude<Category, 'all'>;
  title: string;
  description: string;
  lessonsCount: number;
  studyTime: string;
  level: CourseLevel;
  icon: React.ReactNode;
};


