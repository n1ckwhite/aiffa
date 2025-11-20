import { useAppColors } from 'shared/theme/colors';

export const useHeaderColors = () => {
  const theme = useAppColors();
  return {
    iconColor: theme.blue.accent,
    subTextColor: 'text.muted',
  };
};


