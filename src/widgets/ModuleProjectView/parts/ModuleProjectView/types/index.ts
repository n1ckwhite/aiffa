export type ModuleProjectViewProps = {
  mod: any;
  project: {
    id: string;
    title: string;
    mdPath?: string;
    repoUrl?: string;
    authors?: Array<{ username: string; name: string }>;
  };
  md?: string;
};


