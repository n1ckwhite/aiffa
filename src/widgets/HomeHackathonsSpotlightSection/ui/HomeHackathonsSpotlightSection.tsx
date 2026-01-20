"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiAward, FiBriefcase, FiUsers, FiZap } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

const HomeHackathonsSpotlightSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Box as="section" aria-labelledby="home-hackathons-title" px={0} py={{ base: 12, md: 16 }}>
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
              "radial-gradient(520px 240px at 14% 18%, rgba(249,115,22,0.12), transparent 60%), radial-gradient(520px 240px at 86% 12%, rgba(59,130,246,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="900px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="orange" variant="outline" uppercase={false} icon={FiZap}>
                  Хакатоны
                </PillBadge>
                <PillBadge colorScheme="blue" variant="outline" uppercase={false} icon={FiUsers}>
                  Командный опыт
                </PillBadge>
                <PillBadge colorScheme="green" variant="outline" uppercase={false} icon={FiBriefcase}>
                  Опыт для трудоустройства
                </PillBadge>
              </HStack>
              <Heading id="home-hackathons-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Хакатон = ускоритель опыта работы в команде
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Это важная часть AIFFA: ты учишься работать как в реальной разработке — распределять задачи, договариваться,
                писать код в команде, доводить до результата и защищать решение. Плюс — награды и сильный кейс в портфолио.
              </Text>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {[
                {
                  id: "team",
                  icon: FiUsers,
                  title: "Команда и процессы",
                  desc: "Планирование, роли, коммуникация, ревью и дедлайны — то, что реально спрашивают на работе.",
                },
                {
                  id: "portfolio",
                  icon: FiBriefcase,
                  title: "Кейс для резюме",
                  desc: "Результат можно показывать: продуманный проект, разборы, участие и вклад — всё фиксируется.",
                },
                {
                  id: "awards",
                  icon: FiAward,
                  title: "Награды и признание",
                  desc: "Призовые места, упоминания и достижения. Победители попадают в подборки и получают уважение комьюнити.",
                },
              ].map((c) => (
                <Box key={c.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg="orange.50"
                      color="orange.700"
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
              <AppButtonLink to="/hackathons" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                Открыть хакатоны
              </AppButtonLink>
              <AppButtonLink to="/hackathons" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Как проходит
              </AppButtonLink>
              <AppButtonLink to="/creators" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Победители и создатели
              </AppButtonLink>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHackathonsSpotlightSection;

