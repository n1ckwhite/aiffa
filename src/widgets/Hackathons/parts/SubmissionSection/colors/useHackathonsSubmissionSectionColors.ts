import { useColorModeValue } from "@chakra-ui/react";
import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsSubmissionSectionColors = () => {
  const { mutedTextColor, sectionCardBg, cardBorderColor, accentBorderColor } =
    useHackathonsColors();

  const submissionBgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.95))"
  );

  const requirementsCircleBg = useColorModeValue("teal.500", "teal.400");
  const githubCircleBg = useColorModeValue("blue.500", "blue.400");
  const readmeCircleBg = useColorModeValue("purple.500", "purple.400");
  const demoCircleBg = useColorModeValue("green.500", "green.400");
  const descriptionColor = useColorModeValue("blue.600", "blue.300");

  return {
    mutedTextColor,
    sectionCardBg,
    cardBorderColor,
    accentBorderColor,
    submissionBgGradient,
    requirementsCircleBg,
    githubCircleBg,
    readmeCircleBg,
    demoCircleBg,
    descriptionColor,
  };
};


