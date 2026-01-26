"use client";

import React from "react";
import { Box, Container, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue, usePrefersReducedMotion } from "@chakra-ui/react";
import { FiArrowRightCircle, FiCheckCircle, FiCompass, FiMessageCircle, FiTrendingUp } from "react-icons/fi";
import { ForSessionsLottieIcon } from "@/shared/icons/components-icon";

const HomeHowItWorksSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const borderHoverColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const cardShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const cardHoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");
  const overlineColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const prefersReducedMotion = usePrefersReducedMotion();

  const accentBlueBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const accentBlueColor = useColorModeValue("blue.700", "blue.200");
  const accentGreenBg = useColorModeValue("green.50", "whiteAlpha.200");
  const accentGreenColor = useColorModeValue("green.700", "green.200");
  const accentPurpleBg = useColorModeValue("purple.50", "whiteAlpha.200");
  const accentPurpleColor = useColorModeValue("purple.700", "purple.200");
  const accentOrangeBg = useColorModeValue("orange.50", "whiteAlpha.200");
  const accentOrangeColor = useColorModeValue("orange.700", "orange.200");
  const accentTealBg = useColorModeValue("teal.50", "whiteAlpha.200");
  const accentTealColor = useColorModeValue("teal.700", "teal.200");

  const steps = [
    {
      title: "Выбираешь шаг",
      desc: "Берёшь weekly или тему — чтобы не тратить силы на “с чего начать”.",
      icon: FiCompass,
      accentBg: accentBlueBg,
      accentColor: accentBlueColor,
    },
    {
      title: "Делаешь практику",
      desc: "Решаешь во встроенной IDE и получаешь опыт через действие.",
      icon: FiCheckCircle,
      accentBg: accentGreenBg,
      accentColor: accentGreenColor,
    },
    {
      title: "Помогаешь другим",
      desc: "Подсказываешь, отвечаешь и даёшь фидбек — так растёшь быстрее и легче работаешь в команде.",
      icon: FiMessageCircle,
      accentBg: accentPurpleBg,
      accentColor: accentPurpleColor,
    },
    {
      title: "Фиксируешь прогресс",
      desc: "Получаешь ревью, улучшаешь решение и видишь рост по действиям — шаг за шагом.",
      icon: FiTrendingUp,
      accentBg: accentOrangeBg,
      accentColor: accentOrangeColor,
    },
    {
      title: "Берёшь следующий шаг",
      desc: "Собираешь план и идёшь дальше — к проектам и более сложным задачам.",
      icon: FiArrowRightCircle,
      accentBg: accentTealBg,
      accentColor: accentTealColor,
    },
  ] as const;

  return (
    <Box as="section" px={0} pb={{ base: 10, md: 12 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <VStack spacing={2} textAlign="center">
            <Box aria-hidden="true">
              <ForSessionsLottieIcon />
            </Box>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
              Как это работает
            </Text>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="760px" mx="auto">
              Пять простых шагов, чтобы у тебя был понятный старт и видимый прогресс.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 5 }}>
            {steps.map((s, idx) => (
              <Box
                key={s.title}
                position="relative"
                overflow="hidden"
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                bg={cardBg}
                boxShadow={cardShadow}
                minH={{ base: "auto", md: "200px" }}
                transition={prefersReducedMotion ? undefined : "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease"}
                _hover={{
                  borderColor: borderHoverColor,
                  boxShadow: cardHoverShadow,
                  transform: prefersReducedMotion ? undefined : "translateY(-2px)",
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  bg: s.accentColor,
                  opacity: 0.9,
                  borderTopLeftRadius: "2xl",
                  borderBottomLeftRadius: "2xl",
                }}
              >
                <Stack spacing={3}>
                  <HStack spacing={3} align="center">
                    <Box
                      w={{ base: "48px", md: "52px" }}
                      h={{ base: "48px", md: "52px" }}
                      borderRadius="xl"
                      bg={s.accentBg}
                      color={s.accentColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={s.icon} boxSize={6} aria-hidden="true" />
                    </Box>
                    <Stack spacing={0} minW={0}>
                      <Text fontSize="xs" color={overlineColor} letterSpacing="0.12em" textTransform="uppercase">
                        Шаг {(idx + 1).toString().padStart(2, "0")}
                      </Text>
                      <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color={titleColor} letterSpacing="-0.01em">
                        {s.title}
                      </Text>
                    </Stack>
                  </HStack>

                  <Text fontSize={{ base: "sm", md: "md" }} color={textColor} lineHeight="1.7">
                    {s.desc}
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeHowItWorksSection;

