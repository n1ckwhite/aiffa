import React from "react";
import { Box, Heading, Text, SimpleGrid, VStack, useColorModeValue } from "@chakra-ui/react";
import { useCreatorsData } from "../hooks/useCreatorsData";
import CreatorCard from "./CreatorCard";

const FeaturedCreatorsSection: React.FC = () => {
  const { items } = useCreatorsData();
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const sectionBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const sectionBg = useColorModeValue("white", "whiteAlpha.50");

  const featuredCreators = React.useMemo(() => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.slice(0, 3);
  }, [items]);

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
            Три лица AIFFA
          </Heading>
          <Text fontSize="sm" color={subtitleColor} maxW={{ base: "full", md: "640px" }}>
            Небольшая выборка людей, которые помогают платформе расти каждый день. Полный список создателей —
            ниже на странице.
          </Text>
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



