"use client";

import React from "react";
import { Box, Button, Container, Heading, HStack, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { PeopleLottieIcon, ForSessionsLottieIcon, BusinessManTelescop, SessionsLottieIcon } from "@/shared/icons/components-icon";
import { telegramHref, habrCareerHref } from "@/widgets/Footer/model/links";

/**
 * HomeCommunityChannelsSection highlights Telegram, sessions, and work.
 */
const HomeCommunityChannelsSection: React.FC = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const cardBorder = useColorModeValue("gray.200", "whiteAlpha.200");
  const subtleBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const shadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.24)");
  const badgeColor = useColorModeValue("gray.500", "whiteAlpha.700");

  return (
    <Box as="section" px={0} py={{ base: 12, md: 16 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <VStack spacing={2} align="flex-start" maxW="860px">
            <Text fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" color={badgeColor}>
              Комьюнити и рост
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="-0.02em" color={titleColor}>
              Telegram, сессии и работа — всё рядом.
            </Heading>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
              Общение, разборы и карьерный фокус — в одном ритме, чтобы быстрее расти и закреплять результат.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, md: 6 }}>
            <Box
              borderRadius="3xl"
              borderWidth="1px"
              borderColor={cardBorder}
              bg={cardBg}
              boxShadow={shadow}
              p={{ base: 5, md: 6 }}
            >
              <Stack spacing={5}>
                <Stack spacing={2}>
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase" color={badgeColor}>
                    Telegram
                  </Text>
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={titleColor}>
                    Комьюнити для быстрых ответов и поддержки.
                  </Text>
                  <Text color={textColor} fontSize="sm" lineHeight="1.7">
                    Вопросы по задачам, фидбек по решениям, общение и подсказки — чтобы не застревать и двигаться дальше.
                  </Text>
                </Stack>

                <Button
                  as="a"
                  href={telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="blue"
                  borderRadius="full"
                  alignSelf="flex-start"
                  aria-label="Перейти в Telegram (откроется в новой вкладке)"
                >
                  Перейти в Telegram
                </Button>

                <Box
                  borderRadius="2xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    aria-hidden="true"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PeopleLottieIcon />
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Stack spacing={{ base: 5, md: 6 }}>
              <Box
                borderRadius="3xl"
                borderWidth="1px"
                borderColor={cardBorder}
                bg={cardBg}
                boxShadow={shadow}
                p={{ base: 5, md: 6 }}
              >
                <HStack spacing={4} align="flex-start" justify="space-between">
                  <Stack spacing={2}>
                    <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase" color={badgeColor}>
                      Сессии
                    </Text>
                    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor}>
                      Живые разборы и ответы на блокеры.
                    </Text>
                    <Text color={textColor} fontSize="sm" lineHeight="1.7">
                      Приходишь на сессию, разбираешь задачу и возвращаешься к практике с ясным планом.
                    </Text>
                    <AppButtonLink to="/sessions" size="sm" colorScheme="blue" borderRadius="full" alignSelf="flex-start">
                      Посмотреть сессии
                    </AppButtonLink>
                  </Stack>
                  <Box
                    aria-hidden="true"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="2xl"
                    flexShrink={0}
                  >
                    <SessionsLottieIcon />
                  </Box>
                </HStack>
              </Box>

              <Box
                borderRadius="3xl"
                borderWidth="1px"
                borderColor={cardBorder}
                bg={cardBg}
                boxShadow={shadow}
                p={{ base: 5, md: 6 }}
              >
                <HStack spacing={4} align="flex-start" justify="space-between">
                  <Stack spacing={2}>
                    <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase" color={badgeColor}>
                      Работа
                    </Text>
                    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor}>
                      Кейсы и рост, которые ценят работодатели.
                    </Text>
                    <Text color={textColor} fontSize="sm" lineHeight="1.7">
                      Сильные результаты и стабильная практика делают профиль заметным и ускоряют оффер.
                    </Text>
                    <Button
                      as="a"
                      href={habrCareerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      variant="outline"
                      borderRadius="full"
                      alignSelf="flex-start"
                      aria-label="Смотреть вакансии (откроется в новой вкладке)"
                    >
                      Смотреть вакансии
                    </Button>
                  </Stack>
                  <Box
                    aria-hidden="true"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="2xl"
                    flexShrink={0}
                  >
                    <BusinessManTelescop />
                  </Box>
                </HStack>
              </Box>
            </Stack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeCommunityChannelsSection;
