import type { ComponentType, ReactNode } from "react";

export type StatTileProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ComponentType<any>;
  tooltip?: string;
  accentColor?: string;
  emphasis?: boolean;
  to?: string;
};


