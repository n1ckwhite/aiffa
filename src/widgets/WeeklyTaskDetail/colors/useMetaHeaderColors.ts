import { useAppColors } from 'shared/theme/colors';

export const useMetaHeaderColors = () => {
  const theme = useAppColors();
  return {
    doneColor: 'green.400' as const,
    titleMuted: 'text.muted' as const,
    border: theme.borderColor,
  };
};


