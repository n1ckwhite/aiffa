"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiCalendar, FiUsers, FiZap } from "react-icons/fi";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { useWeeklyResetCountdown } from "@/widgets/WeeklyTasks/parts/Countdown/hooks/useWeeklyResetCountdown";

const HomeRhythmSection: React.FC = () => {
  const countdown = useWeeklyResetCountdown();

  return (
    <Box as="section" aria-labelledby="home-rhythm-title" px={0} py={{ base: 12, md: 16 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 10 }} align="center">
          <VStack spacing={3} textAlign="center" maxW="760px">
            <Heading
              id="home-rhythm-title"
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
            >
              Регулярный рост: задачи, люди, команда
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.7">
              В AIFFA есть ритм: короткая практика каждую неделю, регулярные сессии и хакатоны с командным опытом.
              Это помогает не “загореться на неделю”, а расти стабильно.
            </Text>
          </VStack>

          <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={{ base: 4, md: 5 }} w="full">
            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="transparent"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="blue.50"
                  color="blue.700"
                  _dark={{ bg: "whiteAlpha.200", color: "blue.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiCalendar} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold">Weekly‑задачи</Text>
                  <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.6">
                    Маленькие практические задачи, которые обновляются по неделям и прокачивают навык “делать”.
                  </Text>
                  <Text mt={3} fontSize="xs" color="gray.500" _dark={{ color: "whiteAlpha.700" }}>
                    До обновления:{" "}
                    <Box as="span" fontWeight="bold" color="gray.700" _dark={{ color: "whiteAlpha.900" }}>
                      {countdown.days}д {countdown.hours}ч {countdown.minutes}м {countdown.seconds}с
                    </Box>
                  </Text>
                  <AppButtonLink to="/weekly" mt={4} borderRadius="full" colorScheme="blue" w={{ base: "100%", sm: "auto" }}>
                    Перейти к weekly
                  </AppButtonLink>
                </Box>
              </HStack>
            </Box>

            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="transparent"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="purple.50"
                  color="purple.700"
                  _dark={{ bg: "whiteAlpha.200", color: "purple.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiUsers} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold">Сессии и консультации</Text>
                  <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.6">
                    Разборы кода и проектов, Q&amp;A/AMA, нетворкинг — чтобы получать поддержку и находить людей.
                  </Text>
                  <AppButtonLink to="/sessions" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Посмотреть сессии
                  </AppButtonLink>
                </Box>
              </HStack>
            </Box>

            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              bg="transparent"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="44px"
                  h="44px"
                  borderRadius="xl"
                  bg="green.50"
                  color="green.700"
                  _dark={{ bg: "whiteAlpha.200", color: "green.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiZap} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold">Хакатоны</Text>
                  <Text mt={2} fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }} lineHeight="1.6">
                    Командный опыт, живые задачи, публичные разборы и сильный кейс — концентрат роста за несколько дней.
                  </Text>
                  <AppButtonLink to="/hackathons" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Открыть хакатоны
                  </AppButtonLink>
                </Box>
              </HStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeRhythmSection;

