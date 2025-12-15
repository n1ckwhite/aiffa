import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiCheckSquare, FiClock, FiCalendar } from "react-icons/fi";
import { useCreatorsData } from "../hooks/useCreatorsData";
import CreatorCard from "./CreatorCard";

const WeeklyAuthorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const sectionBgGradient = useColorModeValue(
    "linear(to-br, rgba(224,242,254,0.9), rgba(219,234,254,0.95))",
    "linear(to-br, rgba(15,23,42,0.98), rgba(56,189,248,0.32))",
  );
  const sectionBorder = useColorModeValue("blue.100", "whiteAlpha.200");
  const iconBorderColor = useColorModeValue("cyan.400", "cyan.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("cyan.500", "cyan.300");
  const weekTrackBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const weekFillBg = useColorModeValue("cyan.400", "cyan.300");
  const weekMetaColor = useColorModeValue("gray.700", "gray.200");
  const weekCalendarIconColor = useColorModeValue("cyan.500", "cyan.300");
  const weekClockIconColor = useColorModeValue("blue.400", "blue.300");
  const weekChipBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");
  const weekChipBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const weekLabelColor = useColorModeValue("cyan.700", "cyan.200");
  const weekTimeHighlight = useColorModeValue("blue.500", "blue.200");

  const weeklyCreators = React.useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter((creator) => creator.areas?.includes("weekly"));
  }, [items]);

  const featuredWeeklyCreators = React.useMemo(() => {
    if (weeklyCreators.length === 0) {
      return [];
    }

    return [...weeklyCreators].sort(
      (a, b) => b.contributions.weeklyTasks - a.contributions.weeklyTasks,
    );
  }, [weeklyCreators]);

  const [weekInfo, setWeekInfo] = React.useState(() => ({
    progress: 0,
    remainingDays: 0,
    remainingHours: 0,
    weekLabel: "",
  }));

  React.useEffect(() => {
    const updateWeekInfo = () => {
      const now = new Date();
      const day = now.getDay(); // 0 (Sun) - 6 (Sat)
      const mondayOffset = (day + 6) % 7;
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - mondayOffset);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);

      const totalMs = end.getTime() - start.getTime();
      const elapsedMs = now.getTime() - start.getTime();
      const remainingMs = Math.max(end.getTime() - now.getTime(), 0);

      const progress = totalMs > 0 ? Math.min(Math.max(elapsedMs / totalMs, 0), 1) : 0;
      const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);

      const startLabel = start.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      });
      const endLabelDate = new Date(end);
      endLabelDate.setDate(end.getDate() - 1);
      const endLabel = endLabelDate.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      });

      const weekLabel = `${startLabel} — ${endLabel}`;

      setWeekInfo({ progress, remainingDays, remainingHours, weekLabel });
    };

    updateWeekInfo();
    const id = window.setInterval(updateWeekInfo, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (featuredWeeklyCreators.length === 0) {
    return null;
  }

  return (
    <Box as="section" aria-label="Авторы задач недели AIFFA">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={4} textAlign="center">
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
              <Icon
                as={FiCheckSquare}
                boxSize={3.5}
                aria-hidden="true"
                color={iconColor}
              />
            </Box>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Авторы задач недели AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь мы отмечаем авторов задач недели, которые особенно помогли сообществу за последнюю неделю. Это топ‑3
            по вкладу в актуальные weekly‑челленджи.
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
            <Box
              w="full"
              h="6px"
              borderRadius="full"
              bg={weekTrackBg}
              overflow="hidden"
            >
              <Box
                h="100%"
                w={`${Math.max(weekInfo.progress * 100, 4)}%`}
                bg={weekFillBg}
                borderRadius="full"
                transition="width 0.4s ease-out"
              />
            </Box>
          </VStack>
        </VStack>

        <Box w="full">
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 4, md: 5 }}
            alignItems="stretch"
          >
            {featuredWeeklyCreators.slice(0, 3).map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                index={index + 1}
                mode="weekly"
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default WeeklyAuthorsSection;


