"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiCheckCircle, FiShield, FiStar, FiThumbsUp, FiTrendingUp } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

const HomeQualitySection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Box as="section" aria-labelledby="home-quality-title" px={0} py={{ base: 12, md: 16 }}>
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
              "radial-gradient(520px 240px at 14% 16%, rgba(34,197,94,0.10), transparent 60%), radial-gradient(520px 240px at 86% 14%, rgba(249,115,22,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="860px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="green" variant="outline" uppercase={false} icon={FiShield}>
                  Качество и модерация
                </PillBadge>
                <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
                  Платформа должна быть серьёзной
                </PillBadge>
              </HStack>
              <Heading id="home-quality-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Ценность не “обещается” — она обеспечивается процессом
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                У нас много UGC, поэтому важно качество: задачи, материалы и проекты проходят отбор и улучшаются через обратную связь.
                Это защищает новичков от мусора и делает платформу пригодной для бизнеса.
              </Text>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {[
                {
                  id: "moderation",
                  icon: FiCheckCircle,
                  title: "Отбор и улучшение",
                  desc: "Материалы и задачи дорабатываются: чёткие формулировки, полезные примеры, понятные критерии.",
                },
                {
                  id: "culture",
                  icon: FiThumbsUp,
                  title: "Культура без токсичности",
                  desc: "Отклик и обсуждение — про рост и пользу. Мы строим среду, где безопасно задавать вопросы и учиться.",
                },
                {
                  id: "signals",
                  icon: FiStar,
                  title: "Честные сигналы качества",
                  desc: "Реакции и звёзды помогают выделять полезное. Вклад и прогресс отображаются в профиле действиями.",
                },
                {
                  id: "trust",
                  icon: FiTrendingUp,
                  title: "Доверие к прогрессу",
                  desc: "XP и достижения растут вместе с тобой — это делает развитие видимым и понятным для всех сторон.",
                },
              ].map((c) => (
                <Box key={c.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg="green.50"
                      color="green.700"
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
              <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                Смотреть создателей
              </AppButtonLink>
              <AppButtonLink to="/learn" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Открыть материалы
              </AppButtonLink>
              <AppButtonLink to="/partners" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Для бизнеса
              </AppButtonLink>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeQualitySection;

