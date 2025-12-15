import { useCreatorsColors } from "@/widgets/Creators/colors/useCreatorsColors";

export const useCreatorsSeniorColors = () => {
  const { pageTitleColor, pageDescriptionColor, seniorCardBg, seniorCardBorder, seniorTextColor, seniorIconPalettes } = useCreatorsColors();
  return { pageTitleColor, pageDescriptionColor, seniorCardBg, seniorCardBorder, seniorTextColor, seniorIconPalettes };
};


