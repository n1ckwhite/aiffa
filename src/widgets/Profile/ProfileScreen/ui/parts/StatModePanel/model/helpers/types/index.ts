import type { ComponentType, ReactNode } from "react";

export type WeeklyStatModePanelItem = {
  cardVariant: "weekly";
  title: string;
  description: string;
  leftIcon?: ComponentType<any>;
  colorScheme: string;
  tag: string;
  to: string;
  authorLabel: string;
  authorHref: string;
  authorAvatarUrl: string;
  dateLabel: string;
  rightStats?: string;
  starsCount: number;
  commentsCount: number;
  solvedCount: number;
};

export type MaterialStatModePanelItem = {
  cardVariant: "material";
  title: string;
  to: string;
  starsCount: number;
  viewsCount: number;
  commentsCount: number;
  tasksCount: number;
  authorUsername: string;
  authorName?: string;
  dateIso?: string;
};

export type ProjectStatModePanelItem = {
  cardVariant: "project";
  title: string;
  to: string;
  starsCount: number;
  viewsCount: number;
  commentsCount: number;
  authorUsername: string;
  authorName: string;
  dateIso: string;
};

export type PlainStatModePanelItem = {
  cardVariant?: undefined;
  title: string;
  description: string;
  leftIcon?: ComponentType<any>;
  authorLabel: string;
  authorHref: string;
};

export type StatModePanelItem =
  | WeeklyStatModePanelItem
  | MaterialStatModePanelItem
  | ProjectStatModePanelItem
  | PlainStatModePanelItem;

export type StatModePanelPaginationConfig = {
  pageSize: number;
  ariaLabel?: string;
};

export type StatModePanelProps = {
  title: string;
  description: string;
  icon?: ComponentType<any>;
  items: readonly StatModePanelItem[];
  pagination?: StatModePanelPaginationConfig;
  actions?: ReactNode;
};

