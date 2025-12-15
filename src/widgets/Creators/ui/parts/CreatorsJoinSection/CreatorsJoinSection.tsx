import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { joinCards } from "./data/joinCards";
import { useCreatorsJoinColors } from "./colors/useCreatorsJoinColors";
import type { JoinCard } from "./types";

const headingId = "creators-join-heading";

const CreatorsJoinSection: React.FC = () => {
  const { pageDescriptionColor, joinIconPalettes } = useCreatorsJoinColors();

  return (
    <Box as="section" id="how-to-join" scrollMarginTop="90px" aria-labelledby={headingId}>
      <VStack align="stretch" spacing={4}>
        <VStack align="center" spacing={3} textAlign="center">
          <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
            Как попасть в создатели AIFFA
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color={pageDescriptionColor} textAlign="center" maxW={{ base: "full", md: "840px" }} mx="auto">
            Мы отмечаем людей, которые делают вклад в экосистему: делятся материалами и задачами недели, мейнтейнтят проекты, пишут статьи, помогают на
            хакатонах и поддерживают комьюнити. Присоединиться может любой, кто создаёт пользу и готов делиться опытом.
          </Text>
        </VStack>

        <SimpleGrid as="ul" listStyleType="none" m={0} p={0} minChildWidth="260px" spacing={{ base: 3, md: 4 }} justifyItems="stretch">
          {joinCards.map((card: JoinCard) => {
            const palette = joinIconPalettes[card.paletteIndex as number];

            return (
              <Box
                as="li"
                key={card.title}
                borderWidth="1px"
                borderColor={palette.borderColor}
                borderRadius="2xl"
                bg={palette.cardBg}
                p={5}
                boxShadow="lg"
                w="full"
                minW="0"
                maxW="100%"
                transition="all 0.2s ease-in-out"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                  borderColor: palette.accentColor,
                }}
              >
                <HStack align="flex-start" spacing={4}>
                  <Box
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg={palette.iconBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={card.icon} aria-hidden="true" boxSize={5} color={palette.color} />
                  </Box>
                  <VStack align="flex-start" spacing={2}>
                    <Text fontWeight="semibold" color="gray.800" _dark={{ color: "gray.100" }} fontSize="md">
                      {card.title}
                    </Text>
                    <Text fontSize="sm" color={pageDescriptionColor} lineHeight="1.5">
                      {card.description}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default CreatorsJoinSection;


