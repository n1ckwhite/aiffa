import type { useModuleProjectsColors } from '../../../../../colors';

export type HeaderCardProps = {
  mod: any;
  projectsCount: number;
  projectsLabel: string;
  levelLabel: string;
  colors: ReturnType<typeof useModuleProjectsColors>;
};


