import { useAppColors } from '../../../../shared/theme/colors';

export const useFeedbackWidgetColors = () => {
  const theme = useAppColors();
  return {
    containerBg: 'transparent',
    cardBg: theme.cardBg,
    borderColor: theme.borderColor,
    titleColor: theme.titleColor,
    textColor: theme.descColor,
    primaryBg: 'blue.600',
    primaryHoverBg: 'blue.700',
    neutralHoverBg: theme.controlsHoverBg,
    neutralIcon: theme.controlsIcon,
  };
};


