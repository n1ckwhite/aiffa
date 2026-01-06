import type { ProjectItem } from '../../../../../hooks/useProjects';
import type { useModuleProjectsColors } from '../../../../../colors';

export type ProjectsGridProps = {
  modId: string;
  projects: ProjectItem[];
  colors: ReturnType<typeof useModuleProjectsColors>;
};


export type ProjectGridCardProps = {
  modId: string;
  project: ProjectItem;
  colors: ReturnType<typeof useModuleProjectsColors>;
};