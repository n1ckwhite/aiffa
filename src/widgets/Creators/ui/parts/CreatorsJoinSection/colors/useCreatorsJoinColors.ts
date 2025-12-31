import { useColorModeValue } from "@chakra-ui/react";

export const useCreatorsJoinColors = () => {
  const pageTitleColor = useColorModeValue('gray.800', 'gray.100');
  const pageDescriptionColor = useColorModeValue("gray.700", "gray.300");
  const joinIconPalettes = [
    {
      iconBg: useColorModeValue("blue.50", "whiteAlpha.100"),
      color: useColorModeValue("blue.500", "blue.300"),
      cardBg: useColorModeValue("white", "whiteAlpha.100"),
      borderColor: useColorModeValue("blackAlpha.100", "whiteAlpha.200"),
      accentColor: useColorModeValue("blue.400", "blue.300"),
    },
    {
      iconBg: useColorModeValue("teal.50", "whiteAlpha.100"),
      color: useColorModeValue("teal.500", "teal.200"),
      cardBg: useColorModeValue("white", "whiteAlpha.100"),
      borderColor: useColorModeValue("blackAlpha.100", "whiteAlpha.200"),
      accentColor: useColorModeValue("teal.400", "teal.200"),
    },
    {
      iconBg: useColorModeValue("purple.50", "whiteAlpha.100"),
      color: useColorModeValue("purple.500", "purple.200"),
      cardBg: useColorModeValue("white", "whiteAlpha.100"),
      borderColor: useColorModeValue("blackAlpha.100", "whiteAlpha.200"),
      accentColor: useColorModeValue("purple.400", "purple.200"),
    },
  ];

  return { pageTitleColor, pageDescriptionColor, joinIconPalettes };
};


