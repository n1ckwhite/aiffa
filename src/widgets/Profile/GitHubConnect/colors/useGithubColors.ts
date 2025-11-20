import { useAppColors } from 'shared/theme/colors';

export const useGithubColors = () => {
  const theme = useAppColors();
  return {
    divider: theme.borderColor,
    hint: theme.descColor,
    link: theme.blue.accent,
  };
};


