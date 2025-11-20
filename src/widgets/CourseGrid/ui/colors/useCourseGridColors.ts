import { useAppColors } from 'shared/theme/colors';

export const useCourseGridColors = () => {
  const theme = useAppColors();
  return {
    titleColor: theme.titleColor,
    subtitleColor: theme.descColor,
  };
};


