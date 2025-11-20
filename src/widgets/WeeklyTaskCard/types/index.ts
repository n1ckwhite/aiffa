import type React from 'react';

export type WeeklyTaskCardProps = {
  taskId: string;
  label: string;
  description?: string;
  done?: boolean;
  tag: string;
  icon: React.ElementType;
  colorScheme?: string;
  to: string;
  authorName?: string;
  authorUrl?: string;
  authorAvatarUrl?: string;
};

export type Ring = { from: string; to: string };


