import { useColorModeValue } from "@chakra-ui/react";

export const useProfileScreenUiColors = () => {
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const muted = useColorModeValue("gray.600", "whiteAlpha.700");

  const formBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const formBg = useColorModeValue("white", "blackAlpha.200");

  const headerNavIconColor = useColorModeValue("blue.700", "whiteAlpha.900");

  // Left-side icons
  const leftIconColors = {
    people: useColorModeValue("blue.600", "blue.300"),
    xp: useColorModeValue("orange.600", "orange.300"),
    work: useColorModeValue("purple.600", "purple.300"),
    location: useColorModeValue("green.600", "green.300"),
    mail: useColorModeValue("pink.600", "pink.300"),
    link: useColorModeValue("cyan.600", "cyan.300"),
  };

  const textStrong = useColorModeValue("gray.800", "whiteAlpha.900");
  const xpNumberColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const linkTextColor = useColorModeValue("blue.700", "blue.300");
  const sectionLabelColor = useColorModeValue("gray.700", "whiteAlpha.700");

  const primaryBtnBg = useColorModeValue("blue.600", "blue.600");
  const primaryBtnHoverBg = useColorModeValue("blue.700", "blue.700");
  const primaryBtnActiveBg = useColorModeValue("blue.800", "blue.800");

  const achievementsCardBorder = useColorModeValue("orange.200", "whiteAlpha.200");
  const achievementsIconBg = useColorModeValue("orange.100", "whiteAlpha.100");
  const achievementsIconColor = useColorModeValue("orange.700", "orange.200");
  const achievementsCountBg = useColorModeValue("white", "whiteAlpha.50");

  const calloutBorder = useColorModeValue("orange.200", "whiteAlpha.200");
  const calloutBg = useColorModeValue("orange.50", "whiteAlpha.50");
  const calloutIconBg = useColorModeValue("orange.100", "whiteAlpha.100");
  const calloutIconColor = useColorModeValue("orange.700", "orange.200");
  const calloutTitleColor = useColorModeValue("orange.900", "whiteAlpha.900");
  const calloutBodyColor = useColorModeValue("orange.800", muted);

  const qaMaterialsBg = useColorModeValue("blue.700", "blue.700");
  const qaMaterialsBorder = useColorModeValue("blue.600", "blue.600");
  const qaMaterialsHoverBg = useColorModeValue("blue.700", "blue.800");
  const qaMaterialsActiveBg = useColorModeValue("blue.800", "blue.900");

  const qaWeeklyBg = useColorModeValue("green.700", "green.700");
  const qaWeeklyBorder = useColorModeValue("green.600", "green.600");
  const qaWeeklyHoverBg = useColorModeValue("green.700", "green.800");
  const qaWeeklyActiveBg = useColorModeValue("green.800", "green.900");

  const qaBlogBg = useColorModeValue("purple.700", "purple.700");
  const qaBlogBorder = useColorModeValue("purple.600", "purple.600");
  const qaBlogHoverBg = useColorModeValue("purple.700", "purple.800");
  const qaBlogActiveBg = useColorModeValue("purple.800", "purple.900");

  const qaWriteBg = useColorModeValue("orange.600", "orange.600");
  const qaWriteBorder = useColorModeValue("orange.500", "orange.500");
  const qaWriteHoverBg = useColorModeValue("orange.600", "orange.700");
  const qaWriteActiveBg = useColorModeValue("orange.700", "orange.800");

  const qaHackathonsBg = useColorModeValue("pink.600", "pink.600");
  const qaHackathonsBorder = useColorModeValue("pink.500", "pink.500");
  const qaHackathonsHoverBg = useColorModeValue("pink.600", "pink.700");
  const qaHackathonsActiveBg = useColorModeValue("pink.700", "pink.800");

  const qaSessionsBg = useColorModeValue("cyan.800", "cyan.800");
  const qaSessionsBorder = useColorModeValue("cyan.600", "cyan.600");
  const qaSessionsHoverBg = useColorModeValue("cyan.700", "cyan.800");
  const qaSessionsActiveBg = useColorModeValue("cyan.800", "cyan.900");

  // People panel (followers / following)
  const peoplePanelIconBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const peoplePanelIconColor = useColorModeValue("blue.700", "blue.300");
  const peoplePanelGhostHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const peoplePanelGhostActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  // Range pills (stats/contribution)
  const rangeActiveBg = useColorModeValue("gray.900", "whiteAlpha.200");
  const rangeActiveHoverBg = useColorModeValue("gray.800", "whiteAlpha.300");
  const rangeActiveActiveBg = useColorModeValue("gray.700", "whiteAlpha.200");
  const rangeActiveText = useColorModeValue("white", "whiteAlpha.900");
  const rangeActiveIcon = useColorModeValue("white", "whiteAlpha.900");

  const rangeInactiveText = useColorModeValue("gray.800", "whiteAlpha.800");
  const rangeInactiveHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const rangeInactiveActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");


  const invalidBorder = useColorModeValue("red.300", "red.400");
  const warningBorder = useColorModeValue("red.200", "red.400");
  const warningBg = useColorModeValue("red.50", "red.900");
  const warningText = useColorModeValue("red.800", "red.200");

  return {
    cardBg,
    cardBorder,
    muted,
    formBorder,
    formBg,
    headerNavIconColor,
    leftIconColors,
    textStrong,
    xpNumberColor,
    linkTextColor,
    sectionLabelColor,
    primaryBtnBg,
    primaryBtnHoverBg,
    primaryBtnActiveBg,
    achievementsCardBorder,
    achievementsIconBg,
    achievementsIconColor,
    achievementsCountBg,
    calloutBorder,
    calloutBg,
    calloutIconBg,
    calloutIconColor,
    calloutTitleColor,
    calloutBodyColor,
    qaMaterialsBg,
    qaMaterialsBorder,
    qaMaterialsHoverBg,
    qaMaterialsActiveBg,
    qaWeeklyBg,
    qaWeeklyBorder,
    qaWeeklyHoverBg,
    qaWeeklyActiveBg,
    qaBlogBg,
    qaBlogBorder,
    qaBlogHoverBg,
    qaBlogActiveBg,
    qaWriteBg,
    qaWriteBorder,
    qaWriteHoverBg,
    qaWriteActiveBg,
    qaHackathonsBg,
    qaHackathonsBorder,
    qaHackathonsHoverBg,
    qaHackathonsActiveBg,
    qaSessionsBg,
    qaSessionsBorder,
    qaSessionsHoverBg,
    qaSessionsActiveBg,
    peoplePanelIconBg,
    peoplePanelIconColor,
    peoplePanelGhostHoverBg,
    peoplePanelGhostActiveBg,
    rangeActiveBg,
    rangeActiveHoverBg,
    rangeActiveActiveBg,
    rangeActiveText,
    rangeActiveIcon,
    rangeInactiveText,
    rangeInactiveHoverBg,
    rangeInactiveActiveBg,
    invalidBorder,
    warningBorder,
    warningBg,
    warningText,
  };
};


