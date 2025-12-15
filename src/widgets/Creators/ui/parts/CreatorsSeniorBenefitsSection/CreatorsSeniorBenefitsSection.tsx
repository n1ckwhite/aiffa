import React from "react";
import { Box, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { SeniorTeamIcon } from "@/shared/icons/components-icon";
import { useCreatorsSeniorColors } from "./colors/useCreatorsSeniorColors";
import { seniorBenefitCards } from "./data/seniorBenefitCards";
import type { SeniorBenefitCard } from "./types";

const headingId = "creators-senior-benefits-heading";

const CreatorsSeniorBenefitsSection: React.FC = () => {
  const { seniorCardBg, seniorCardBorder, seniorTextColor, seniorIconPalettes } = useCreatorsSeniorColors();

  return (
    <Box as="section" id="senior-benefits" scrollMarginTop="90px" aria-labelledby={headingId}>
      <VStack spacing={3} align="center" textAlign="center">
        <VStack spacing={3} align="center">
          <SeniorTeamIcon />
          <Heading id={headingId} as="h2" size="md" letterSpacing="-0.02em">
            Как это делает вас сильнее
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color={seniorTextColor} maxW={{ base: "full", md: "880px" }}>
            Делитесь опытом, чтобы создать поток знаний для комьюнити: люди, которым вы помогаете, позже смогут усилить ваши проекты, принести новые
            идеи и закрыть сложные задачи вместе с вами.
          </Text>
        </VStack>

        <SimpleGrid minChildWidth="260px" spacing={{ base: 3, md: 4 }} justifyItems="stretch" w="full">
          {seniorBenefitCards.map((card: SeniorBenefitCard) => {
            const palette = seniorIconPalettes[card.paletteIndex as number];

            return (
              <HStack
                key={card.title}
                align="flex-start"
                spacing={4}
                p={5}
                borderRadius="2xl"
                textAlign="left"
                bg={seniorCardBg}
                borderWidth="1px"
                borderColor={seniorCardBorder}
                boxShadow="lg"
                w="full"
                minW="0"
                transition="all 0.2s ease-in-out"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                  borderColor: palette.accentColor,
                }}
              >
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
                <VStack align="flex-start" spacing={2} textAlign="left" w="full">
                  <Text fontWeight="semibold" color="gray.800" _dark={{ color: "gray.100" }} fontSize="md">
                    {card.title}
                  </Text>
                  <Text fontSize="sm" color={seniorTextColor} lineHeight="1.5">
                    {card.description}
                  </Text>
                </VStack>
              </HStack>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default CreatorsSeniorBenefitsSection;


