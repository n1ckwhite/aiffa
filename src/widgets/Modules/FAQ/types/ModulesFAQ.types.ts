export type ModulesFaqItem = {
  title: string;
  content: string;
};

export type ModulesFaqVariant =
  | 'materials'
  | 'blog'
  | 'tasks'
  | 'xp'
  | 'partners'
  | 'hackathons'
  | 'sessions'
  | 'creators'
  | 'home';
  
export type ModulesFAQProps = {
  title?: string;
  variant?: ModulesFaqVariant;
  showSupportBlock?: boolean;
};

