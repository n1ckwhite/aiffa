import { useModuleLessonsColors } from '../../../colors';
import { useModuleLevel } from '../../../hooks/useModuleLevel';

export const useModuleLessonsViewData = (moduleId?: string) => {
  const colors = useModuleLessonsColors();
  const { level } = useModuleLevel(moduleId);

  const levelAccent =
    level === 'beginner'
      ? colors.beginnerBorder
      : level === 'intermediate'
        ? colors.intermediateBorder
        : colors.advancedBorder;

  return {
    colors,
    level,
    levelAccent,
  };
};


