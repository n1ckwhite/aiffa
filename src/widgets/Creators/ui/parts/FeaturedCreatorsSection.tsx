import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiBookOpen } from "react-icons/fi";
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
  const iconBorderColor = useColorModeValue("orange.400", "orange.300");
  const iconBg = useColorModeValue("orange.50", "whiteAlpha.100");
  const iconColor = useColorModeValue("orange.400", "orange.300");
  const monthTrackBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const monthFillBg = useColorModeValue("orange.400", "orange.300");
  const monthMetaColor = useColorModeValue("gray.700", "gray.200");

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

    return [...materialsCreators].sort(
      (a, b) => b.contributions.lessons - a.contributions.lessons,
    );
  }, [materialsCreators]);

  const [nowTs, setNowTs] = React.useState(() => Date.now());

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setNowTs(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const monthInfo = React.useMemo(() => {
    const now = new Date(nowTs);
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const totalMs = end.getTime() - start.getTime();
    const elapsedMs = now.getTime() - start.getTime();
    const remainingMs = Math.max(end.getTime() - now.getTime(), 0);

    const progress = totalMs > 0 ? Math.min(Math.max(elapsedMs / totalMs, 0), 1) : 0;
    const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);

    const monthLabel = now.toLocaleDateString("ru-RU", {
      month: "long",
    });

    return { progress, remainingDays, remainingHours, monthLabel };
  }, [nowTs]);

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
              borderColor={iconBorderColor}
              bg={iconBg}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={FiBookOpen}
                boxSize={3.5}
                aria-hidden="true"
                color={iconColor}
              />
            </Box>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Авторы, которые двигают контент AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Небольшая выборка людей, которые создают материалы для AIFFA. Авторы отсортированы по общему вкладу в
            материалы.
          </Text>
          <VStack spacing={1} mt={2} w="full" maxW={{ base: "320px", md: "420px" }}>
            <Text fontSize="xs" color={monthMetaColor}>
              Текущий месяц: {monthInfo.monthLabel} · осталось {monthInfo.remainingDays} д{" "}
              {monthInfo.remainingHours} ч
            </Text>
            <Box
              w="full"
              h="6px"
              borderRadius="full"
              bg={monthTrackBg}
              overflow="hidden"
            >
              <Box
                h="100%"
                w={`${Math.max(monthInfo.progress * 100, 4)}%`}
                bg={monthFillBg}
                borderRadius="full"
                transition="width 0.4s ease-out"
              />
            </Box>
          </VStack>
        </VStack>
        <Box
          maxH={{ base: "260px", md: "320px" }}
          overflowY={featuredCreators.length > 3 ? "auto" : "visible"}
          pr={featuredCreators.length > 3 ? 1 : 0}
          transition="max-height 0.25s ease-out"
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
      </VStack>
    </Box>
  );
};

export default FeaturedCreatorsSection;



