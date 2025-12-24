"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { PeopleLottieIcon } from "@/shared/icons/components-icon";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";
import { useSessionsForWhomCards } from "./data";

const SessionsForWhomSection: React.FC = () => {
  const {
    sectionLabelColor,
    forWhomBgGradient,
    forWhomBorderColor,
    forWhomTitleColor,
    forWhomDescriptionColor,
    forWhomCardBg,
    forWhomCardBorderColor,
    forWhomCardTitleColor,
    forWhomCardTextColor,
    iconCircleBg,
    iconColor,
  } = useSessionsColors();

  const cards = useSessionsForWhomCards();

  return (
    <Box as="section" aria-labelledby="sessions-audience-title">
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={forWhomBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={forWhomBorderColor}
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 5, md: 7, lg: 8 }}
      >
        <Stack
          direction="column"
          spacing={4}
          align="center"
          justify="center"
          position="relative"
          zIndex={1}
        >
          <Stack spacing={{ base: 4, md: 5 }} maxW="full">
            <Box textAlign="center">
              <Text
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="0.18em"
                color={sectionLabelColor}
                fontWeight="semibold"
                mb={1}
              >
                Кому подойдут сессии
              </Text>
              <Heading
                id="sessions-audience-title"
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                color={forWhomTitleColor}
              >
                Если не хочется учиться в одиночку
              </Heading>
              <Text
                mt={3}
                fontSize={{ base: "sm", md: "md" }}
                color={forWhomDescriptionColor}
              >
                Сессии — это живые созвоны, где можно задать вопросы, показать свой
                код и услышать опыт других. Подходят, если хочется поддержки и
                понятного следующего шага.
              </Text>
            </Box>

            <Box w="100%">
              <PeopleLottieIcon />
            </Box>
          </Stack>

          <SimpleGrid
            minChildWidth={{ base: "100%", sm: "200px", md: "250px" }}
            spacing={{ base: 3, md: 4 }}
            flex="1"
            w="full"
            minW={0}
            maxW="1200px"
            mx="auto"
            boxSizing="border-box"
          >
            {cards.map((card) => (
              <Box
                key={card.id}
                as="article"
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={forWhomCardBorderColor}
                bg={forWhomCardBg}
                p={{ base: 3, md: 4 }}
                w="full"
                minW={{ base: "100%", sm: "200px", md: "250px" }}
                maxW="100%"
                boxSizing="border-box"
                flexShrink={0}
              >
                <HStack spacing={2} mb={2} align="center" w="full" minW={0}>
                  <Box
                    borderRadius="full"
                    boxSize={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={iconCircleBg}
                    color={iconColor}
                    aria-hidden="true"
                    flexShrink={0}
                  >
                    {card.icon}
                  </Box>
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                    color={forWhomCardTextColor}
                    wordBreak="break-word"
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                    minW={0}
                  >
                    {card.subtitle}
                  </Text>
                </HStack>
                <Heading as="h3" fontSize="sm" mb={1} color={forWhomCardTitleColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                  {card.title}
                </Heading>
                <Text fontSize="xs" color={forWhomCardTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal">
                  {card.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default SessionsForWhomSection;


