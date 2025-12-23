import { useAppColors } from 'shared/theme/colors';

export const useLayoutColors = () => {
  const theme = useAppColors();
  return {
    color: theme.titleColor,
    appBg: theme.cardBg,
  };
};



