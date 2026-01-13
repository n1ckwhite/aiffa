import type { ComponentType, ReactNode } from "react";

export type StatsRange = "week" | "month" | "all";

export type ProfilePeopleMode =
  | "stats"
  | "followers"
  | "following"
  | "achievements"
  | "materials"
  | "weekly"
  | "projects"
  | "articles"
  | "hackathons"
  | "sessions"
  | "contrib-materials"
  | "contrib-projects"
  | "contrib-weekly"
  | "contrib-articles";

export type StatTileModel = {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ComponentType<any>;
  tooltip?: string;
  accentColor?: string;
  emphasis?: boolean;
  mode?: ProfilePeopleMode;
};

export type ProfileEditInitial = {
  name: string;
  bio: string;
  workplace: string;
  location: string;
  links: [string, string, string, string];
};


