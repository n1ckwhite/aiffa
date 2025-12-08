import { useAppColors } from "shared/theme/colors";

export const useModuleProjectPageClientColors = () => {
  const theme = useAppColors();

  const borderColor = theme.borderColor;
  const cardBg = theme.cardBg;
  const descColor = theme.descColor;
  const linkColor = theme.blue.accent;

  return {
    borderColor,
    cardBg,
    descColor,
    linkColor,
  };
};


