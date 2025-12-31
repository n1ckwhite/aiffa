import { useColorModeValue } from "@chakra-ui/react";

export const useCreatorsGridColors = () => {
  const subtitleColor = useColorModeValue("gray.700", "gray.300");
  const buttonColor = useColorModeValue("blue.600", "blue.300");

  const menuBg = useColorModeValue("white", "gray.800");
  const menuBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const menuHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const menuTextColor = useColorModeValue("gray.800", "gray.100");
  const activeMenuBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const activeMenuBorder = useColorModeValue("blue.300", "blue.300");

  const filterIdleBg = useColorModeValue("white", "whiteAlpha.50");
  const filterActiveBg = useColorModeValue("rgba(59,130,246,0.12)", "rgba(59,130,246,0.28)");
  const filterIdleBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const filterActiveBorder = useColorModeValue("blue.400", "blue.300");
  const filterIdleIcon = useColorModeValue("gray.700", "gray.100");
  const filterActiveIcon = useColorModeValue("blue.400", "blue.200");
  const filterHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const filterHoverBorder = useColorModeValue("blue.200", "blue.300");

  const badgeBg = useColorModeValue("white", "gray.900");
  const badgeBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const badgeIconColor = useColorModeValue("green.500", "green.300");

  const paginationColors = {
    controlsBg: useColorModeValue("white", "gray.800"),
    controlsBorder: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    controlsHoverBg: useColorModeValue("blackAlpha.50", "whiteAlpha.200"),
    controlsIcon: useColorModeValue("gray.700", "gray.200"),
    descColor: useColorModeValue("gray.500", "gray.400"),
  };

  return {
    subtitleColor,
    buttonColor,
    menuBg,
    menuBorder,
    menuHoverBg,
    menuTextColor,
    activeMenuBg,
    activeMenuBorder,
    filterIdleBg,
    filterActiveBg,
    filterIdleBorder,
    filterActiveBorder,
    filterIdleIcon,
    filterActiveIcon,
    filterHoverBg,
    filterHoverBorder,
    badgeBg,
    badgeBorder,
    badgeIconColor,
    paginationColors,
  };
};


