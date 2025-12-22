import { useAppColors } from 'shared/theme/colors';

export const useModulesFaqColors = () => {
  const theme = useAppColors();

  return {
    headingColor: theme.blue.accent,
    borderColor: theme.borderColor,
    titleColor: theme.blue.accent,
    textColor: theme.descColor,
    sectionBg: theme.cardBgFAQ,
    focusShadow: '0 0 0 3px rgba(66,153,225,0.35)',
  } as const;
};

