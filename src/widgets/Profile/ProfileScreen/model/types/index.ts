import type { ComponentType, ReactNode } from "react";

export type StatsRange = "week" | "month" | "all";

export type StatTileModel = {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ComponentType<any>;
  tooltip?: string;
  accentColor?: string;
  emphasis?: boolean;
};

export type ProfileEditInitial = {
  name: string;
  bio: string;
  workplace: string;
  location: string;
  links: [string, string, string, string];
};


