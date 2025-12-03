import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsPrizeSectionColors = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor, prizeBgGradient } = useHackathonsColors();

  return {
    sectionCardBg,
    cardBorderColor,
    mutedTextColor,
    prizeBgGradient,
  };
};
