import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiBookOpen, FiCalendar, FiClock } from "react-icons/fi";
import { useCreatorsData } from "../../hooks/useCreatorsData";
import CreatorCard from "../CreatorCard";
import { useFeaturedCreatorsColors } from "./colors/useFeaturedCreatorsColors";
import { getFeaturedCreators } from "./helpers/getFeaturedCreators";
import { useMonthInfo } from "./hooks/useMonthInfo";
import { Creator } from "@/widgets/Creators/model/types";

const headingId = "creators-materials-heading";

const FeaturedCreatorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const monthInfo = useMonthInfo();
  const {
    subtitleColor,
    iconBorderColor,
    iconBg,
    iconColor,
    monthTrackBg,
    monthFillBg,
    monthMetaColor,
    monthCalendarIconColor,
    monthClockIconColor,
    monthChipBg,
    monthChipBorder,
    monthMonthHighlight,
    monthTimeHighlight,
  } = useFeaturedCreatorsColors();

  const featuredCreators = React.useMemo(() => getFeaturedCreators(items as Creator[]), [items]);

  if (featuredCreators.length === 0) {
    return null;
  }

  return (
    <Box as="section" aria-labelledby={headingId} bg="transparent">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={3} textAlign="center">
          <HStack spacing={2} align="start" justify="center">
            <Box
              as="span"
              px={2.5}
              py={1.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={iconBorderColor}
              bg={iconBg}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiBookOpen} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
              Авторы материалов AIFFA
            </Heading>
          </HStack>
          <Text fontSize="md" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь отмечаем авторов материалов AIFFA: важен не объём публикаций, а их качество и то, сколько звёзд и благодарностей ставит комьюнити за
            пользу. Показываем топ‑3 за месяц.
          </Text>
          <VStack spacing={2} w="full" maxW={{ base: "360px", md: "460px" }}>
            <HStack spacing={3} justify="center">
              <HStack spacing={2}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={monthChipBorder}
                  bg={monthChipBg}
                  display="inline-flex"
                  alignItems="center"
                  gap={1.5}
                >
                  <Icon as={FiCalendar} boxSize={3.5} aria-hidden="true" color={monthCalendarIconColor} />
                  <Text fontSize="xs" color={monthMetaColor}>
                    <Text as="span" fontWeight="semibold" color={monthMonthHighlight}>
                      {monthInfo.monthLabel}
                    </Text>
                  </Text>
                </Box>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={monthChipBorder}
                  bg={monthChipBg}
                  display="inline-flex"
                  alignItems="center"
                  gap={1.5}
                >
                  <Icon as={FiClock} boxSize={3.5} aria-hidden="true" color={monthClockIconColor} />
                  <Text fontSize="xs" color={monthMetaColor}>
                    <Text as="span" fontWeight="semibold" color={monthTimeHighlight}>
                      {monthInfo.remainingDays} д {monthInfo.remainingHours} ч
                    </Text>
                  </Text>
                </Box>
              </HStack>
            </HStack>
            <Box w="full" h="6px" borderRadius="full" bg={monthTrackBg} overflow="hidden">
              <Box h="100%" w={`${Math.max(monthInfo.progress * 100, 4)}%`} bg={monthFillBg} borderRadius="full" transition="width 0.4s ease-out" />
            </Box>
          </VStack>
        </VStack>
        <Box w="full" minW={0} maxW="100%">
          <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={{ base: 4, md: 5 }} alignItems="stretch" w="full" minW={0} maxW="100%">
            {featuredCreators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index + 1} mode="materials" />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default FeaturedCreatorsSection;


