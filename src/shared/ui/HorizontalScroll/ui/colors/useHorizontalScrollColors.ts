import { useAppColors } from 'shared/theme/colors';

export const useHorizontalScrollColors = () => {
  const theme = useAppColors();
  const btnBg = 'transparent';
  const btnColor = theme.descColor;
  return { btnBg, btnColor };
};


