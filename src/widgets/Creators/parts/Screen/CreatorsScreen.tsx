import React from "react";
import { Box, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import HeroSection from "../../ui/parts/HeroSection";
import CreatorsGridSection from "../../ui/parts/CreatorsGridSection";
import TimeRangeSection from "../../ui/parts/TimeRangeSection";
import ContributionSection from "../../ui/parts/ContributionSection";

const CreatorsScreen: React.FC = () => {
  const pageDescriptionColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      as="main"
      role="main"
      aria-label="Создатели AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      transition="none"
    >
      <Box maxW="1320px" mx="auto">
        <VStack align="stretch" spacing={{ base: 8, md: 10 }}>
          <Box as="section" aria-label="Описание страницы создателей AIFFA">
            <VStack
              align="center"
              spacing={0}
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                letterSpacing="-0.03em"
              >
                Страница создателей AIFFA
              </Heading>
              <Text
                mt={3}
                fontSize={{ base: "sm", md: "md" }}
                color={pageDescriptionColor}
                maxW={{ base: "full", md: "720px" }}
              >
                Здесь собраны люди, которые делают AIFFA живой платформой: авторы материалов и задач недели,
                мейнтейнеры, менторы, участники хакатонов и те, кто поддерживает идею. Страница поможет найти тех,
                с кем вам по пути в развитии комьюнити.
              </Text>
            </VStack>
          </Box>
          <HeroSection />
          <CreatorsGridSection />
          <TimeRangeSection />
          <ContributionSection />
        </VStack>
      </Box>
    </Box>
  );
};

export default CreatorsScreen;


