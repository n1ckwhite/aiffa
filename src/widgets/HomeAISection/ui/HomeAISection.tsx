"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiCpu, FiFileText, FiHelpCircle, FiShield, FiTerminal } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

const HomeAISection: React.FC = () => {
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.65)");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Box
      as="section"
      aria-labelledby="home-ai-title"
      id="home-ai"
      scrollMarginTop="120px"
      px={0}
      py={{ base: 12, md: 16 }}
    >
      <Container maxW="1200px">
        <Box
          borderRadius="3xl"
          borderWidth="1px"
          borderColor={borderColor}
          bg={surfaceBg}
          p={{ base: 5, md: 7 }}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            bgImage:
              "radial-gradient(540px 260px at 86% 18%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(540px 260px at 18% 14%, rgba(34,197,94,0.12), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 7, lg: 10 }} position="relative" zIndex={1}>
            <VStack align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} spacing={4} flex={1}>
              <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                  AI‑инструменты
                </PillBadge>
                <PillBadge colorScheme="orange" variant="outline" uppercase={false}>
                  Серьёзный рабочий процесс
                </PillBadge>
              </HStack>

              <Heading id="home-ai-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                ИИ‑ассистент для работы и проверок
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Мы строим AI‑слой поверх практики: чтобы не просто “решать задачки”, а работать как в реальной разработке —
                с подсказками, объяснениями и быстрым разбором ошибок.
              </Text>

              <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }} pt={1}>
                <AppButtonLink to="/weekly" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                  Попробовать на задаче
                </AppButtonLink>
                <AppButtonLink to="/sessions" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                  Прийти на разбор
                </AppButtonLink>
              </HStack>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "260px" }} spacing={4} flex={1}>
              {[
                {
                  id: "hints",
                  icon: FiHelpCircle,
                  title: "Подсказки по ходу решения",
                  desc: "Помогает понять, куда смотреть дальше, если застрял — без спойлеров и токсичности.",
                },
                {
                  id: "explain",
                  icon: FiFileText,
                  title: "Объяснение ошибок",
                  desc: "Разбирает, почему решение не проходит, и что именно нужно исправить в логике.",
                },
                {
                  id: "checks",
                  icon: FiTerminal,
                  title: "Проверки и фидбек",
                  desc: "Ускоряет цикл “написал → проверил → улучшил”, чтобы практика была ближе к реальной работе.",
                },
                {
                  id: "safety",
                  icon: FiShield,
                  title: "Честность и доверие",
                  desc: "Цель — укреплять доверие к прогрессу: опыт виден по результатам, а не по словам.",
                },
              ].map((card) => (
                <Box key={card.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg="blue.50"
                      color="blue.700"
                      _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={card.icon} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        {card.title}
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        {card.desc}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>

          <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }} mt={{ base: 6, md: 7 }}>
            <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
              Встроено в практику
            </PillBadge>
            <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
              IDE (VS Code)
            </PillBadge>
            <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
              Обратная связь
            </PillBadge>
            <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
              Профиль и достижения
            </PillBadge>
            <PillBadge colorScheme="gray" variant="outline" uppercase={false} icon={FiCpu}>
              AI‑слой
            </PillBadge>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeAISection;

