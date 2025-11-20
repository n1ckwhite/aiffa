export type ActionsProps = {
    onCheck: () => void;
    checking: boolean;
    done: boolean;
    externalLinks: Array<{ label: string; href: string }>;
  };