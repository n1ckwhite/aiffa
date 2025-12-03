import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsHowItWorksSectionColors = () => {
  const {
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    mutedTextColor,
  } = useHackathonsColors();

  return {
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    mutedTextColor,
  };
};


