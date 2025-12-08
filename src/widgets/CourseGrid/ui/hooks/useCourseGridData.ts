import React from 'react';
import { courses } from '../../model';
import type { CourseGridProps } from '../types/CourseGrid.types';
import { moduleMeta } from '../../model/moduleMeta';

export const useCourseGridData = (category: CourseGridProps['category']) => {
  const filteredCourses = React.useMemo(
    () => (category === 'all' ? courses : courses.filter((c) => c.category === category)),
    [category],
  );

  return {
    courses: filteredCourses,
    moduleMeta,
  };
};


