import type React from "react";

export type MiniCaseAccent = {
  bgLight: string;
  bgDark: string;
  fgLight: string;
  fgDark: string;
  borderLight: string;
  borderDark: string;
};

export type MiniCase = {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  to: string;
  accent: MiniCaseAccent;
};
