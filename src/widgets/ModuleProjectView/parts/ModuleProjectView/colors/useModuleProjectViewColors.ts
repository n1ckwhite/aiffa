import { useAppColors } from 'shared/theme/colors';

export const useModuleProjectViewColors = () => {
  const theme = useAppColors();
  return {
    borderColor: theme.borderColor,
    cardBg: theme.cardBg,
    descColor: theme.descColor,
    linkColor: theme.blue.accent,
  };
};


