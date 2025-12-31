import { useColorModeValue } from "@chakra-ui/react";
import { avatarPalettes } from "../data/avatarPalettes";
import { roleColors } from "../data/roles";
import type { Creator } from "../../../../model/types";

type UseCreatorCardColorsArgs = {
  role: Creator["role"];
  avatarIndex: number;
};

export const useCreatorCardColors = ({ role, avatarIndex }: UseCreatorCardColorsArgs) => {
  const goldBorder = useColorModeValue("yellow.400", "yellow.300");
  const goldColor = useColorModeValue("yellow.700", "yellow.200");

  const silverBorder = useColorModeValue("purple.400", "purple.300");
  const silverColor = useColorModeValue("purple.600", "purple.200");

  const bronzeBorder = useColorModeValue("orange.500", "orange.300");
  const bronzeColor = useColorModeValue("orange.700", "orange.200");

  const defaultBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const defaultColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const pillBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const pillHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");

  const rankBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");
  // Light theme: gray.500 is too low-contrast for small meta text (Lighthouse).
  const metaColor = useColorModeValue("gray.700", "gray.300");
  const materialsIconColor = useColorModeValue("orange.400", "orange.300");
  const tasksIconColor = useColorModeValue("blue.400", "blue.300");
  const reviewsIconColor = useColorModeValue("green.500", "green.300");
  const linkColor = useColorModeValue("blue.600", "blue.200");

  const cardBgMaterials = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const cardBgWeekly = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");

  const currentRoleColors = roleColors[role];
  const roleColor = useColorModeValue(currentRoleColors.light, currentRoleColors.dark);
  const roleBg = useColorModeValue("white", "whiteAlpha.100");
  const roleBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const primaryTextColor = useColorModeValue("gray.800", "gray.100");
  const bgIconColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  const avatarBg = useColorModeValue(avatarPalettes[avatarIndex].light, avatarPalettes[avatarIndex].dark);

  const rankPalette = {
    1: { border: goldBorder, color: goldColor },
    2: { border: silverBorder, color: silverColor },
    3: { border: bronzeBorder, color: bronzeColor },
    default: { border: defaultBorder, color: defaultColor },
  } as const;

  return {
    accentColor,
    pillBorderColor,
    pillHoverBg,
    rankBg,
    metaColor,
    materialsIconColor,
    tasksIconColor,
    reviewsIconColor,
    linkColor,
    cardBgMaterials,
    cardBgWeekly,
    roleColor,
    roleBg,
    roleBorder,
    primaryTextColor,
    bgIconColor,
    avatarBg,
    rankPalette,
  };
};


