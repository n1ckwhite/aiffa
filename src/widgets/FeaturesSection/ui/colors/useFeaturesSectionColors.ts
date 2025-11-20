import { useAppColors } from '../../../../shared/theme/colors';

export const useFeaturesSectionColors = () => {
  const theme = useAppColors();
  return {
    bg: 'transparent',
    titleColor: theme.titleColor,
    textColor: theme.descColor,
    iconBg: theme.blue.indexBg,
    iconColor: theme.blue.accent,
  };
};


