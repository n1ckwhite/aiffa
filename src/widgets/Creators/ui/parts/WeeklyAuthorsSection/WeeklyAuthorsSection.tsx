import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiCalendar, FiCheckSquare, FiClock } from "react-icons/fi";
import { useCreatorsData } from "../../hooks/useCreatorsData";
import CreatorCard from "../CreatorCard";
import { useWeeklyAuthorsColors } from "./colors/useWeeklyAuthorsColors";
import { getFeaturedWeeklyCreators } from "./helpers/getFeaturedWeeklyCreators";
import { useWeekInfo } from "./hooks/useWeekInfo";
import type { Creator } from "../../../model/types";

const headingId = "creators-weekly-heading";

const WeeklyAuthorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const weekInfo = useWeekInfo();
  const {
    subtitleColor,
    iconBorderColor,
    iconBg,
    iconColor,
    weekTrackBg,
    weekFillBg,
    weekMetaColor,
    weekCalendarIconColor,
    weekClockIconColor,
    weekChipBg,
    weekChipBorder,
    weekLabelColor,
    weekTimeHighlight,
  } = useWeeklyAuthorsColors();

  const featuredWeeklyCreators = React.useMemo(() => getFeaturedWeeklyCreators(items as Creator[]), [items]);

  if (featuredWeeklyCreators.length === 0) {
    return null;
  }

  return (
    <Box as="section" aria-labelledby={headingId}>
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
              alignItems="start"
              justifyContent="center"
            >
              <Icon as={FiCheckSquare} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
              Авторы задач недели AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь мы отмечаем авторов задач недели: ценим не количество, а практичность задач и отклик — сколько звёзд и благодарностей даёт комьюнити
            за то, что weekly помогают не выпадать из практики. Это топ‑3 за текущую неделю.
          </Text>
          <VStack spacing={2} w="full" maxW={{ base: "360px", md: "460px" }}>
            <HStack spacing={3} justify="center">
              <HStack spacing={2}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={weekChipBorder}
                  bg={weekChipBg}
                  display="inline-flex"
                  alignItems="center"
                  gap={1.5}
                >
                  <Icon as={FiCalendar} boxSize={3.5} aria-hidden="true" color={weekCalendarIconColor} />
                  <Text fontSize="xs" color={weekMetaColor}>
                    <Text as="span" fontWeight="semibold" color={weekLabelColor}>
                      {weekInfo.weekLabel}
                    </Text>
                  </Text>
                </Box>
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={weekChipBorder}
                  bg={weekChipBg}
                  display="inline-flex"
                  alignItems="center"
                  gap={1.5}
                >
                  <Icon as={FiClock} boxSize={3.5} aria-hidden="true" color={weekClockIconColor} />
                  <Text fontSize="xs" color={weekMetaColor}>
                    <Text as="span" fontWeight="semibold" color={weekTimeHighlight}>
                      {weekInfo.remainingDays} д {weekInfo.remainingHours} ч
                    </Text>
                  </Text>
                </Box>
              </HStack>
            </HStack>
            <Box w="full" h="6px" borderRadius="full" bg={weekTrackBg} overflow="hidden">
              <Box h="100%" w={`${Math.max(weekInfo.progress * 100, 4)}%`} bg={weekFillBg} borderRadius="full" transition="width 0.4s ease-out" />
            </Box>
          </VStack>
        </VStack>

        <Box w="full">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
            {featuredWeeklyCreators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index + 1} mode="weekly" />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default WeeklyAuthorsSection;


