import type { IconType } from "react-icons";

export type QuickActionId =
  | "learn"
  | "weekly"
  | "blog"
  | "write"
  | "hackathons"
  | "sessions";

export type QuickActionItem = {
  id: QuickActionId;
  to: string;
  label: string;
  ariaLabel: string;
  icon: IconType;
};