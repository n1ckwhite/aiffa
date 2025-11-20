export type ModulesCategory = 'base' | 'frontend' | 'backend' | 'devops';

export type ModulesSegmentProps = {
  value: ModulesCategory;
  onChange: (value: ModulesCategory) => void;
};


