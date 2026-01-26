import type React from "react";

export type StepAccentKey = "blue" | "green" | "purple" | "orange" | "teal";

export type HowItWorksStep = {
  title: string;
  desc: string;
  icon: React.ElementType;
  accent: StepAccentKey;
};
