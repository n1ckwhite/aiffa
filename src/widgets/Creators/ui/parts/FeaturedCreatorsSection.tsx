import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiBookOpen, FiClock, FiCalendar } from "react-icons/fi";
import { useCreatorsData } from "../hooks/useCreatorsData";
import CreatorCard from "./CreatorCard";

const FeaturedCreatorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const sectionBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const sectionBg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(15,23,42,0.94)");
  const sectionBgGradient = useColorModeValue(
    "linear(to-br, rgba(254,243,199,0.65), rgba(255,255,255,0.98))",
    "linear(to-br, rgba(15,23,42,0.98), rgba(251,146,60,0.20))",
  );
  const filterIdleBg = useColorModeValue("white", "whiteAlpha.50");
  const weekActiveBg = useColorModeValue("orange.500", "orange.400");
  const monthActiveBg = useColorModeValue("rgba(251,146,60,0.16)", "rgba(251,146,60,0.25)");
  const monthActiveBorder = useColorModeValue("orange.500", "orange.300");
  const monthIdleBorder = useColorModeValue("orange.300", "orange.400");
  const filterIdleColor = useColorModeValue("gray.700", "gray.100");
  const filterActiveColor = useColorModeValue("white", "white");

  type TimeRange = "week" | "month";
  const [timeRange, setTimeRange] = React.useState<TimeRange>("week");
  const [isExpanded, setIsExpanded] = React.useState(false);

  const materialsCreators = React.useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter((creator) => creator.areas?.includes("materials"));
  }, [items]);

  const featuredCreators = React.useMemo(() => {
    if (materialsCreators.length === 0) {
      return [];
    }

    const sorted = [...materialsCreators].sort((a, b) => {
      if (timeRange === "week") {
        return b.contributions.weeklyTasks - a.contributions.weeklyTasks;
      }
      return b.contributions.lessons - a.contributions.lessons;
    });

    if (isExpanded) {
      return sorted;
    }

    return sorted.slice(0, 3);
  }, [materialsCreators, timeRange, isExpanded]);

  const shouldScroll = isExpanded && featuredCreators.length > 3;

  if (featuredCreators.length === 0) {
    return null;
  }

  return (
    <Box
      as="section"
      aria-label="Избранные создатели AIFFA"
      borderWidth="1px"
      borderRadius="2xl"
      borderColor={sectionBorder}
      bg={sectionBg}
      bgGradient={sectionBgGradient}
      p={{ base: 4, md: 5 }}
    >
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={1} textAlign="center">
          <HStack spacing={2} align="center" justify="center">
            <Box
              as="span"
              px={2.5}
              py={1.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={useColorModeValue("orange.400", "orange.300")}
              bg={useColorModeValue("orange.50", "whiteAlpha.100")}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={FiBookOpen}
                boxSize={3.5}
                aria-hidden="true"
                color={useColorModeValue("orange.400", "orange.300")}
              />
            </Box>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Авторы материалов AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Небольшая выборка людей, которые создают материалы для AIFFA. Можно посмотреть авторов по активности за
            неделю или за месяц.
          </Text>
          <HStack spacing={2} mt={3}>
            <Button
              size="sm"
              borderRadius="full"
              px={4}
              py={2}
              bg={timeRange === "week" ? weekActiveBg : filterIdleBg}
              color={timeRange === "week" ? filterActiveColor : filterIdleColor}
              borderWidth="1px"
              borderColor={timeRange === "week" ? weekActiveBg : sectionBorder}
              fontSize="sm"
              fontWeight="semibold"
              onClick={() => setTimeRange("week")}
              leftIcon={<FiClock size={16} />}
              _hover={{
                bg: timeRange === "week" ? weekActiveBg : useColorModeValue("blackAlpha.50", "whiteAlpha.100"),
              }}
            >
              За неделю
            </Button>
            <Button
              size="sm"
              borderRadius="full"
              px={4}
              py={2}
              bg={timeRange === "month" ? monthActiveBg : "transparent"}
              color={timeRange === "month" ? useColorModeValue("orange.800", "orange.100") : filterIdleColor}
              borderWidth="1px"
              borderColor={timeRange === "month" ? monthActiveBorder : monthIdleBorder}
              fontSize="sm"
              fontWeight="semibold"
              onClick={() => setTimeRange("month")}
              leftIcon={<FiCalendar size={16} />}
              _hover={{
                bg: timeRange === "month" ? monthActiveBg : useColorModeValue("rgba(251,146,60,0.08)", "whiteAlpha.100"),
              }}
            >
              За месяц
            </Button>
          </HStack>
        </VStack>
        <Box
          maxH={shouldScroll ? { base: "360px", md: "420px" } : "none"}
          overflowY={shouldScroll ? "auto" : "visible"}
          pr={shouldScroll ? 1 : 0}
        >
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 4, md: 5 }}
            alignItems="stretch"
          >
            {featuredCreators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                index={index + 1}
              />
            ))}
          </SimpleGrid>
        </Box>
        {materialsCreators.length > 3 && (
          <Box textAlign="center" pt={1}>
            <Button
              size="sm"
              variant="outline"
              borderRadius="full"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="semibold"
              borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
              onClick={() => setIsExpanded((prev) => !prev)}
              _hover={{
                bg: useColorModeValue("blackAlpha.50", "whiteAlpha.100"),
              }}
            >
              {isExpanded ? "Показать только топ‑3" : "Показать всех авторов материалов"}
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default FeaturedCreatorsSection;



