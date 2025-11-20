import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useLessonPageColors = () => {
  const theme = useAppColors();
  const linkColor = theme.blue.accent;
  const descColor = theme.descColor;
  const authorBorderColor = theme.borderColor;
  const tocActiveBg = theme.blue.chipBg;
  const tocInactiveColor = useColorModeValue('gray.700','gray.300');
  const tocTitleColor = useColorModeValue('gray.500','gray.400');
  const tocItemRadius = '10px';
  const tocItemPxBase = 2;
  const tocItemPxLg = 3;
  const tocItemPyBase = 1.5;
  const tocItemPyLg = 2;
  const tocItemGap = 2;
  const tocItemMinHBase = '32px';
  const tocItemMinHLg = '36px';

  return {
    linkColor,
    descColor,
    authorBorderColor,
    tocActiveBg,
    tocInactiveColor,
    tocTitleColor,
    tocItemRadius,
    tocItemPxBase,
    tocItemPxLg,
    tocItemPyBase,
    tocItemPyLg,
    tocItemGap,
    tocItemMinHBase,
    tocItemMinHLg,
  };
};


