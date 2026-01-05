import { useColorModeValue } from '@chakra-ui/react';

export const useDesktopActionsColors = () => {
  const fillIcon = useColorModeValue('blue.700', 'whiteAlpha.900');
  const avatarBorderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const avatarBg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.200');
  const menuBg = useColorModeValue("white", "gray.800");
  const menuText = useColorModeValue("gray.900", "whiteAlpha.900");
  const menuBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const menuItemHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const menuShadow = useColorModeValue(
    "0 18px 44px rgba(15, 23, 42, 0.14)",
    "0 18px 44px rgba(0, 0, 0, 0.55)",
  );

    return {
        fillIcon: fillIcon,
        avatarBorderColor: avatarBorderColor,
        avatarBg: avatarBg,
        menuBg,
        menuText,
        menuBorder,
        menuItemHoverBg,
        menuShadow,
    }
};



