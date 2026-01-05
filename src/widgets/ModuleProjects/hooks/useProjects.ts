import React from 'react';

export type ProjectItem = {
  id: string;
  title: string;
  mdPath?: string;
  authors?: Array<{ username: string; name: string }>;
  ratingCount?: number;
  views?: number;
  commentsCount?: number;
  updatedAt?: string;
  createdAt?: string;
};

export const useProjects = (mod: any) => {
  const projects = React.useMemo<ProjectItem[]>(() => {
    const many = mod?.projects;
    const one = mod?.project;
    if (Array.isArray(many)) return many as ProjectItem[];
    if (one) return [one] as ProjectItem[];
    return [] as ProjectItem[];
  }, [mod]);

  const projectsCount = projects.length;
  const projectsMod10 = projectsCount % 10;
  const projectsMod100 = projectsCount % 100;
  const projectsLabel =
    projectsCount === 0 ? 'Проекты'
    : (projectsMod10 === 1 && projectsMod100 !== 11) ? 'проект'
    : (projectsMod10 >= 2 && projectsMod10 <= 4 && (projectsMod100 < 12 || projectsMod100 > 14)) ? 'проекта'
    : 'проектов';

  return { projects, projectsCount, projectsLabel };
};


