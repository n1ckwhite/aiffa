export type ModulesFaqItem = {
  title: string;
  content: string;
};

export type ModulesFaqVariant =
  | 'materials'
  | 'tasks'
  | 'xp'
  | 'partners'
  | 'hackathons'
  | 'sessions'
  | 'creators';

export type ModulesFAQProps = {
  title?: string;
  variant?: ModulesFaqVariant;
  showSupportBlock?: boolean;
};

