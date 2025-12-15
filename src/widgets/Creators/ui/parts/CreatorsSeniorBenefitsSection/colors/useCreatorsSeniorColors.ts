import { useCreatorsColors } from "@/widgets/Creators/colors/useCreatorsColors";

export const useCreatorsSeniorColors = () => {
  const { seniorCardBg, seniorCardBorder, seniorTextColor, seniorIconPalettes } = useCreatorsColors();
  return { seniorCardBg, seniorCardBorder, seniorTextColor, seniorIconPalettes };
};


