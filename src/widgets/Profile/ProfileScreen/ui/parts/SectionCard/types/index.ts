import type { ComponentType, ReactNode } from "react";

export type SectionCardProps = {
  title: string;
  description: string;
  icon: ComponentType<any>;
  actions?: ReactNode;
  children: ReactNode;
};


