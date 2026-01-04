import type React from "react";

export type CourseCardContentProps = {
  title: string;
  description: string;
  level?: string;
  icon?: React.ReactNode;

  lessonsCount: number;
  studyTime: string;
  completedLessonsCount: number;

  isActive: boolean;

  accentColor: string;
  titleColor: string;
  textColor: string;
  hoverTextColor: string;
  badgeShadow: string;
  arrowHoverColor: string;
  hoverShadowColor: string;
};


