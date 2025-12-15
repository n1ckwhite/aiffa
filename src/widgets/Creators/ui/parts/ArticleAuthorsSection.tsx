import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { useCreatorsData } from "../hooks/useCreatorsData";
import CreatorCard from "./CreatorCard";

const ArticleAuthorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const iconBorderColor = useColorModeValue("yellow.400", "yellow.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("yellow.500", "yellow.300");

  const articleCreators = React.useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter((creator) => creator.areas?.includes("articles"));
  }, [items]);

  const featuredArticleCreators = React.useMemo(() => {
    if (articleCreators.length === 0) {
      return [];
    }

    return [...articleCreators].sort((a, b) => b.contributions.reviews - a.contributions.reviews);
  }, [articleCreators]);

  if (featuredArticleCreators.length === 0) {
    return null;
  }

  return (
    <Box as="section" aria-label="Авторы статей AIFFA" bg="transparent">
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={3} textAlign="center">
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
              <Icon as={FiStar} boxSize={3.5} aria-hidden="true" color={iconColor} />
            </Box>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
                Авторы статей AIFFA
            </Heading>
          </HStack>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь отмечаем авторов статей: важна глубина и польза материалов, а оцениваем мы по звёздам и благодарностям,
            которые читатели ставят за вклад и качество. Показываем топ‑3 по любви аудитории.
          </Text>
        </VStack>

        <Box w="full">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
            {featuredArticleCreators.slice(0, 3).map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index + 1} mode="articles" />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default ArticleAuthorsSection;


