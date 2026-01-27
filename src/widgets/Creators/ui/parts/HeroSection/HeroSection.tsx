import React from "react";
import { Box, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { BusinessManTelescop } from "@/shared/icons/components-icon";
import { useHeroColors } from "./colors/useHeroColors";
import { heroBullets } from "./data/bullets";
import type { HeroBullet } from "./types";

const HeroSection: React.FC = () => {
  const {
    primaryTextColor,
    secondaryTextColor,
    accentColor,
    pillBorderColor,
    pillHoverBg,
    bulletPalettes,
  } = useHeroColors();

  return (
    <Box as="section" aria-label="Создатели AIFFA">
      <Box position="relative" overflow="hidden"  px={{ base: 4, md: 7 }} py={{ base: 5, md: 7 }}>

        <Stack direction={{ base: "column", xl: "row" }} spacing={{ base: 5, md: 8 }} align={{ base: "center", xl: "center" }} position="relative" zIndex={1}>
          <VStack align={{ base: "center", xl: "flex-start" }} spacing={3} flex={1} textAlign={{ base: "center", xl: "left" }}>
            <Box>
              <Text fontSize={{ base: "xs", md: "sm" }} textTransform="uppercase" letterSpacing="0.08em" color={secondaryTextColor} mb={1}>
                Команда создателей
              </Text>
              <Heading as="h2" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} letterSpacing="-0.04em" color={primaryTextColor}>
                Команда создателей AIFFA
              </Heading>
            </Box>
            <Text fontSize={{ base: "sm", sm: "md", md: "lg" }} fontWeight="semibold" color={primaryTextColor} lineHeight={1.5}>
              Люди, которые делают AIFFA лучше каждый день.
            </Text>
            <Text fontSize="sm" color={secondaryTextColor} lineHeight={1.9} maxW={{ base: "full", sm: "420px", md: "520px" }}>
              AIFFA — это экосистема, которую создают авторы материалов и задач недели, мейнтейнеры проектов, авторы статей, участники хакатонов и те, кто поддерживает идею. Здесь можно найти людей, с которыми вы будете расти, запускать проекты и усиливать комьюнити.
            </Text>
            <Stack as="ul" aria-label="Чем занимаются создатели AIFFA" direction="column" spacing={{ base: 3, md: 5 }} pt={3} w="full" textAlign="left">
              {heroBullets.map((bullet: HeroBullet) => {
                const palette = bulletPalettes[bullet.paletteIndex];
                return (
                  <HStack
                    key={bullet.text}
                    as="li"
                    spacing={3}
                    align="flex-start"
                    w="full"
                  >
                    <Box
                      w={{ base: 8, md: 9 }}
                      h={{ base: 8, md: 9 }}
                      borderRadius="full"
                      bg={palette.iconBg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Box as={bullet.icon} aria-hidden="true" boxSize={{ base: 5, md: 5 }} color={palette.iconColor} />
                    </Box>
                    <Text fontSize="sm" color={secondaryTextColor} wordBreak="break-word" overflowWrap="anywhere" whiteSpace="normal" flex={1} minW={0}>
                      {bullet.text}
                    </Text>
                  </HStack>
                );
              })}
            </Stack>
          </VStack>
          <Box flex={{ base: "none", xl: 1 }} maxW={{ base: "240px", md: "320px" }} mx={{ base: "auto", xl: 0 }}>
            <BusinessManTelescop />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;


