import type React from 'react';

export interface WeeklyTaskInfo {
    id: string;
    mdPath: string;
    tag: string;
    color: 'blue' | 'orange' | 'yellow' | 'purple' | 'green' | 'red';
    icon: React.ElementType;
    editorLanguage: 'shell' | 'html' | 'javascript' | 'css';
  };