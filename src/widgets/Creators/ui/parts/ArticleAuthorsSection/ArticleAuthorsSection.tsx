import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, HStack, Icon } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import CreatorCard from "../CreatorCard";
import { useArticleAuthorsColors } from "./colors/useArticleAuthorsColors";
import { getFeaturedArticleCreators } from "./helpers/getFeaturedArticleCreators";
import { useCreatorsData } from "../../hooks/useCreatorsData";

const headingId = "creators-articles-heading";

const ArticleAuthorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const { subtitleColor, iconBorderColor, iconBg, iconColor } = useArticleAuthorsColors();

  const featuredArticleCreators = React.useMemo(() => getFeaturedArticleCreators(items), [items]);

  if (featuredArticleCreators.length === 0) {
    return null;
  }

  return (
    <Box as="section" aria-labelledby={headingId} bg="transparent">
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
            <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
              Авторы статей AIFFA
            </Heading>
          </HStack>
          <Text fontSize="md" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Здесь отмечаем авторов статей: важна глубина и польза материалов, а оцениваем мы по звёздам и благодарностям,
            которые читатели ставят за вклад и качество. Показываем топ‑3 по любви аудитории.
          </Text>
        </VStack>

        <Box w="full">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
            {featuredArticleCreators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index + 1} mode="articles" />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default ArticleAuthorsSection;


