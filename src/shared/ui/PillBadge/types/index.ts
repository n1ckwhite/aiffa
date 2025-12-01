import type React from "react";

export type PillBadgeColor = "blue" | "purple" | "yellow" | "green" | "red" | "gray" | "orange";

export type PillBadgeVariant = "outline" | "solid";

export type PillBadgePalette = {
  bg: string;
  border: string;
  color: string;
};

export type PillBadgeProps = {
  colorScheme?: PillBadgeColor;
  icon?: React.ElementType;
  children: React.ReactNode;
  uppercase?: boolean;
  variant?: PillBadgeVariant;
  withBorder?: boolean;
};


