"use client";

import React from "react";
import { Box, Button, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiMessageCircle, FiMic, FiSend, FiUsers } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { telegramHref } from "@/widgets/Footer/model/links";

const HomeCommunityFeedbackSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Box as="section" aria-labelledby="home-community-feedback-title" px={0} py={{ base: 12, md: 16 }}>
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
              "radial-gradient(520px 240px at 12% 18%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(520px 240px at 88% 14%, rgba(34,197,94,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="860px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="blue" variant="outline" uppercase={false} icon={FiUsers}>
                  Комьюнити
                </PillBadge>
                <PillBadge colorScheme="green" variant="outline" uppercase={false} icon={FiMessageCircle}>
                  Постоянная обратная связь
                </PillBadge>
              </HStack>
              <Heading
                id="home-community-feedback-title"
                as="h2"
                size={{ base: "md", md: "lg" }}
                letterSpacing="-0.02em"
                color={titleColor}
              >
                Ты не один: вопросы, разборы и рост вместе с людьми
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                В AIFFA важно не просто “порешать”, а пройти путь правильно: задать вопрос, получить фидбек, улучшить решение,
                найти команду и продолжать расти без выгорания.
              </Text>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {[
                {
                  id: "tg",
                  icon: FiSend,
                  title: "Telegram‑сообщество",
                  desc: "Быстрые ответы, знакомства, команды и обмен опытом — в живом темпе.",
                },
                {
                  id: "sessions",
                  icon: FiMic,
                  title: "Сессии и консультации",
                  desc: "Разборы кода и проектов, Q&A/AMA и поддержка, когда застрял.",
                },
                {
                  id: "feedback",
                  icon: FiMessageCircle,
                  title: "Фидбек по платформе",
                  desc: "Пишешь идею или проблему — мы собираем обратную связь и улучшаем экосистему вместе с создателями.",
                },
              ].map((c) => (
                <Box key={c.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
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
                      <Icon as={c.icon} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        {c.title}
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        {c.desc}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>

            <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center" pt={1}>
              <Button
                as="a"
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                borderRadius="full"
                px={{ base: 6, md: 7 }}
                h={{ base: 12, md: 12 }}
                fontWeight="bold"
                colorScheme="blue"
                aria-label="Перейти в Telegram (откроется в новой вкладке)"
                w={{ base: "100%", sm: "auto" }}
              >
                В Telegram
              </Button>
              <AppButtonLink to="/sessions" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Открыть сессии
              </AppButtonLink>
              <AppButtonLink to="/creators" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Стать создателем
              </AppButtonLink>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeCommunityFeedbackSection;

