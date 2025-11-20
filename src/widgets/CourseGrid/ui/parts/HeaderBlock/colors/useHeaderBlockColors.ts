import { useAppColors } from 'shared/theme/colors';

export const useHeaderBlockColors = () => {
  const theme = useAppColors();
  return {
    titleColor: theme.titleColor,
    subtitleColor: theme.descColor,
  };
};


