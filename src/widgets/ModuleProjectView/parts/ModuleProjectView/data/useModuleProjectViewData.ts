export const useModuleProjectViewData = (mod: any, project: any) => {
  const moduleId = mod?.id ?? '';
  const moduleTitle = mod?.title ?? '';
  const projectId = project?.id ?? '';
  const projectTitle = project?.title ?? '';
  const author = Array.isArray(project?.authors) ? project.authors[0] : undefined;

  return {
    moduleId,
    moduleTitle,
    projectId,
    projectTitle,
    author,
  };
};


