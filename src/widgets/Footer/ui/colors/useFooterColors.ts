import { useAppColors } from '../../../../shared/theme/colors';

export const useFooterColors = () => {
  const theme = useAppColors();
  return {
    bg: 'transparent',
    borderColor: theme.borderColor,
    titleColor: theme.titleColor,
    textColor: theme.descColor,
    linkHover: theme.titleColor,
    donateColor: theme.blue.accent,
  };
};


