import { useAppColors } from 'shared/theme/colors';

export const useFaqColors = () => {
  const theme = useAppColors();
  return {
    faqHeadingColor: theme.blue.accent,
    faqBorderColor: theme.borderColor,
    faqTitleColor: theme.blue.accent,
    faqTextColor: theme.descColor,
  };
};


