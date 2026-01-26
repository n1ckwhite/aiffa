import type React from "react";

export type ProgressItem = {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  accent: {
    bgLight: string;
    bgDark: string;
    fgLight: string;
    fgDark: string;
  };
};

export type AchievementItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  from: string;
  to: string;
  color: string;
};

export type ToneKey = "blue" | "green" | "purple" | "orange";
