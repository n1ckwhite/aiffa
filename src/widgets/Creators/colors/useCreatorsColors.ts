import { useColorModeValue } from "@chakra-ui/react";

export const useCreatorsColors = () => {
  const pageTitleColor = useColorModeValue('gray.800', 'gray.100');
  const pageDescriptionColor = useColorModeValue("gray.600", "gray.300");

  const infoCardBg = useColorModeValue("white", "whiteAlpha.100");
  const infoCardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const joinIconPalettes = [
    {
      iconBg: useColorModeValue("blue.50", "whiteAlpha.100"),
      color: useColorModeValue("blue.500", "blue.300"),
      cardBg: infoCardBg,
      borderColor: infoCardBorder,
      accentColor: useColorModeValue("blue.400", "blue.300"),
    },
    {
      iconBg: useColorModeValue("teal.50", "whiteAlpha.100"),
      color: useColorModeValue("teal.500", "teal.200"),
      cardBg: infoCardBg,
      borderColor: infoCardBorder,
      accentColor: useColorModeValue("teal.400", "teal.200"),
    },
    {
      iconBg: useColorModeValue("purple.50", "whiteAlpha.100"),
      color: useColorModeValue("purple.500", "purple.200"),
      cardBg: infoCardBg,
      borderColor: infoCardBorder,
      accentColor: useColorModeValue("purple.400", "purple.200"),
    },
  ];

  const seniorCardBg = useColorModeValue("white", "whiteAlpha.100");
  const seniorCardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const seniorTextColor = useColorModeValue("gray.700", "gray.200");

  const seniorIconPalettes = [
    {
      iconBg: useColorModeValue("blue.50", "whiteAlpha.100"),
      color: useColorModeValue("blue.500", "blue.300"),
      accentColor: useColorModeValue("blue.400", "blue.300"),
    },
    {
      iconBg: useColorModeValue("teal.50", "whiteAlpha.100"),
      color: useColorModeValue("teal.500", "teal.200"),
      accentColor: useColorModeValue("teal.400", "teal.200"),
    },
    {
      iconBg: useColorModeValue("orange.50", "whiteAlpha.100"),
      color: useColorModeValue("orange.500", "orange.200"),
      accentColor: useColorModeValue("orange.400", "orange.200"),
    },
  ];

  return {
    pageTitleColor,
    pageDescriptionColor,
    infoCardBg,
    infoCardBorder,
    joinIconPalettes,
    seniorCardBg,
    seniorCardBorder,
    seniorTextColor,
    seniorIconPalettes,
  };
};


