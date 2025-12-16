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
    cardBgGradient,
    cardBorderColor,
    leftGlowGradient,
    rightGlowGradient,
    bulletPalettes,
  } = useHeroColors();

  return (
    <Box as="section" aria-label="Создатели AIFFA">
      <Box position="relative" overflow="hidden" bgGradient={cardBgGradient} borderRadius="3xl" borderWidth="1px" borderColor={cardBorderColor} px={{ base: 4, md: 7 }} py={{ base: 5, md: 7 }}>
        <Box position="absolute" inset="-40px" opacity={{ base: 0.45, md: 0.6 }} filter="blur(42px)" pointerEvents="none">
          <Box position="absolute" top={{ base: "55%", md: "25%" }} left="-10%" w={{ base: "220px", md: "260px" }} h={{ base: "220px", md: "260px" }} bgGradient={leftGlowGradient} />
          <Box position="absolute" bottom="-15%" right="-5%" w={{ base: "260px", md: "320px" }} h={{ base: "260px", md: "320px" }} bgGradient={rightGlowGradient} />
        </Box>

        <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 5, md: 8 }} align={{ base: "center", md: "center" }} position="relative" zIndex={1}>
          <VStack align={{ base: "center", md: "flex-start" }} spacing={3} flex={1} textAlign={{ base: "center", md: "left" }}>
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
            <Stack as="ul" aria-label="Чем занимаются создатели AIFFA" direction={{ base: "column", lg: "row" }} spacing={{ base: 3, lg: 4 }} pt={2} w="full" wrap="wrap" textAlign="left" justify={{ base: "center", lg: "flex-start" }}>
              {heroBullets.map((bullet: HeroBullet) => {
                const palette = bulletPalettes[bullet.paletteIndex];
                return (
                  <HStack
                    key={bullet.text}
                    as="li"
                    spacing={3}
                    align="flex-start"
                    bg={palette.pillBg}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={pillBorderColor}
                    px={3.5}
                    py={3}
                    flex={1}
                    minW={{ base: "100%", md: "260px" }}
                    maxW={{ base: "420px", lg: "auto" }}
                    mx={{ base: "auto", lg: 0 }}
                    boxShadow="sm"
                    transition="background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease"
                    _hover={{
                      bg: pillHoverBg,
                      boxShadow: "md",
                      borderColor: accentColor,
                      transform: "translateY(-1px)",
                    }}
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
                    <Text fontSize="sm" color={secondaryTextColor}>
                      {bullet.text}
                    </Text>
                  </HStack>
                );
              })}
            </Stack>
          </VStack>
          <Box flex={{ base: "none", md: 1 }} maxW={{ base: "240px", md: "320px" }} mx={{ base: "auto", md: 0 }}>
            <BusinessManTelescop />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;


