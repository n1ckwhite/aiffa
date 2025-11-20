import { useMemo } from 'react';

const moduleLevelById: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
  'bazovye-komandy': 'beginner',
  'html-css': 'beginner',
  'javascript': 'beginner',
  'setevoe-vzaimodeistvie': 'intermediate',
  'fundamentalnye-navyki': 'intermediate',
  'inzhenernaya-kultura': 'intermediate',
  'npm': 'intermediate',
  'sborka-bundle': 'intermediate',
  'react': 'advanced',
  'react-native': 'advanced',
  'nodejs': 'advanced',
  'typescript': 'advanced',
  'accessibility': 'advanced',
};

export const useModuleLevel = (moduleId?: string) => {

  return useMemo(() => {
    const level = moduleId ? (moduleLevelById[moduleId] || 'beginner') : 'beginner';
    const levelLabel = level === 'beginner' ? 'Начальный' : level === 'intermediate' ? 'Средний' : 'Продвинутый';
    const levelScheme = level === 'beginner' ? 'green' : level === 'intermediate' ? 'yellow' : 'red';
    return { level, levelLabel, levelScheme };
  }, [moduleId]);
};


