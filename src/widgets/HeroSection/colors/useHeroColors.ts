import { useAppColors } from '../../../shared/theme/colors';

export const useHeroColors = () => {
  const theme = useAppColors();
  return {
    bg: 'transparent',
    textColor: theme.descColor,
    titleColor: theme.titleColor,
  };
};



