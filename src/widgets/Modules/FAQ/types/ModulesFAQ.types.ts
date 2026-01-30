export type ModulesFaqItem = {
  title: string;
  content: string;
};

export type ModulesFaqVariant =
  | 'materials'
  
export type ModulesFAQProps = {
  title?: string;
  variant?: ModulesFaqVariant;
  showSupportBlock?: boolean;
};

