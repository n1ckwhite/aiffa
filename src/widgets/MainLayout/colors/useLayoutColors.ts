import { useAppColors } from 'shared/theme/colors';

export const useLayoutColors = () => {
  const theme = useAppColors();
  return {
    appBg: theme.cardBg,
  };
};



