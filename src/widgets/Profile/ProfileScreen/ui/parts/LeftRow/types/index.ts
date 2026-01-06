import type { ReactNode, ComponentType } from "react";

export type LeftRowProps = {
  icon: ComponentType<any>;
  iconColor: string;
  spacing?: number;
  children: ReactNode;
};


