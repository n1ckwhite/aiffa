import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { useCreatorsData } from "../hooks/useCreatorsData";
import CreatorCard from "./CreatorCard";

const FeaturedCreatorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const sectionBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const sectionBg = useColorModeValue("white", "whiteAlpha.50");
  const filterIdleBg = useColorModeValue("white", "whiteAlpha.50");
  const filterActiveBg = useColorModeValue("blue.600", "blue.400");
  const filterIdleColor = useColorModeValue("gray.700", "gray.100");
  const filterActiveColor = useColorModeValue("white", "white");

  type TimeRange = "week" | "month";
  const [timeRange, setTimeRange] = React.useState<TimeRange>("week");

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

    return sorted.slice(0, 3);
  }, [materialsCreators, timeRange]);

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
      p={{ base: 4, md: 5 }}
    >
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={1} textAlign="center">
          <Heading as="h2" size="md" letterSpacing="-0.02em">
            Авторы материалов AIFFA
          </Heading>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Небольшая выборка людей, которые создают материалы для AIFFA. Можно посмотреть авторов по активности за
            неделю или за месяц.
          </Text>
          <HStack spacing={2} mt={2}>
            <Button
              size="xs"
              borderRadius="full"
              px={3}
              py={1}
              bg={timeRange === "week" ? filterActiveBg : filterIdleBg}
              color={timeRange === "week" ? filterActiveColor : filterIdleColor}
              borderWidth="1px"
              borderColor={timeRange === "week" ? filterActiveBg : sectionBorder}
              fontSize="xs"
              fontWeight="semibold"
              onClick={() => setTimeRange("week")}
              _hover={{
                bg: timeRange === "week" ? filterActiveBg : useColorModeValue("blackAlpha.50", "whiteAlpha.100"),
              }}
            >
              За неделю
            </Button>
            <Button
              size="xs"
              borderRadius="full"
              px={3}
              py={1}
              bg={timeRange === "month" ? filterActiveBg : filterIdleBg}
              color={timeRange === "month" ? filterActiveColor : filterIdleColor}
              borderWidth="1px"
              borderColor={timeRange === "month" ? filterActiveBg : sectionBorder}
              fontSize="xs"
              fontWeight="semibold"
              onClick={() => setTimeRange("month")}
              _hover={{
                bg: timeRange === "month" ? filterActiveBg : useColorModeValue("blackAlpha.50", "whiteAlpha.100"),
              }}
            >
              За месяц
            </Button>
          </HStack>
        </VStack>
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
      </VStack>
    </Box>
  );
};

export default FeaturedCreatorsSection;



