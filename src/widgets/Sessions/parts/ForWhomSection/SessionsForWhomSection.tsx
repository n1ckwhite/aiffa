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
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.45}
          filter="blur(42px)"
          pointerEvents="none"
          aria-hidden="true"
        >
          <Box
            position="absolute"
            top="-12%"
            left="-18%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(circle at 20% 20%, rgba(59,130,246,0.85), transparent)"
          />
          <Box
            position="absolute"
            bottom="-22%"
            right="-10%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(circle at 80% 80%, rgba(45,212,191,0.45), transparent)"
          />
        </Box>

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
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 3, md: 4 }}
            flex="1"
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
              >
                <HStack spacing={2} mb={2} align="center">
                  <Box
                    borderRadius="full"
                    boxSize={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={iconCircleBg}
                    color={iconColor}
                    aria-hidden="true"
                  >
                    {card.icon}
                  </Box>
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                    color={forWhomCardTextColor}
                  >
                    {card.subtitle}
                  </Text>
                </HStack>
                <Heading as="h3" fontSize="sm" mb={1} color={forWhomCardTitleColor}>
                  {card.title}
                </Heading>
                <Text fontSize="xs" color={forWhomCardTextColor}>
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


