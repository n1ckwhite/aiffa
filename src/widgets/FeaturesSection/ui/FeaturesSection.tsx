import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiAward, FiBookOpen, FiCalendar, FiCpu, FiLayers, FiMap, FiUsers } from "react-icons/fi";
import { useFeaturesSectionColors } from "./colors/useFeaturesSectionColors";
import { AppButtonLink } from "@/shared/ui/AppLink";

const FeaturesSection: React.FC = () => {
  const colors = useFeaturesSectionColors();
  return (
    <Box bg={colors.bg} pb={16} px={0} as="section" aria-labelledby="home-what-you-can-do-title">
      <Container maxW="1200px">
        <VStack spacing={12} align="center">
          <VStack spacing={4} textAlign="center" maxW="820px">
            <Heading
              id="home-what-you-can-do-title"
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color={colors.titleColor}
            >
              Что можно делать в AIFFA
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={colors.textColor} lineHeight="1.7">
              Даже если в IT ноль — начни с маленького шага. Если уже опытный — делись знаниями,
              собирай команду и усиливай экосистему.
            </Text>
          </VStack>

          <SimpleGrid minChildWidth={{ base: "100%", md: "280px" }} spacing={{ base: 4, md: 5 }} w="full">
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
                  bg={colors.iconBg}
                  color={colors.iconColor}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiCalendar} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Решать задачи и расти
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    Weekly и практика, которые помогают двигаться шаг за шагом и не выпадать из прогресса.
                  </Text>
                  <AppButtonLink to="/weekly" mt={4} borderRadius="full" colorScheme="blue" w={{ base: "100%", sm: "auto" }}>
                    Открыть weekly
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
                  <Icon as={FiBookOpen} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Разбираться в темах
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    Живая база материалов с задачами по темам: разбираешься в главе — сразу закрепляешь практикой.
                  </Text>
                  <AppButtonLink to="/learn" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Открыть материалы
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
                  bg="blue.50"
                  color="blue.700"
                  _dark={{ bg: "whiteAlpha.200", color: "blue.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiLayers} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Делать проекты
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    Собирай проекты внутри направлений: от маленьких задач до полноценного результата, который не стыдно показать.
                  </Text>
                  <AppButtonLink to="/learn" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Открыть проекты
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
                  <Icon as={FiUsers} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Находить людей и команду
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    Сессии, консультации, нетворкинг и комьюнити — чтобы расти вместе, а не в одиночку.
                  </Text>
                  <AppButtonLink to="/sessions" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Открыть сессии
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
                  bg="teal.50"
                  color="teal.700"
                  _dark={{ bg: "whiteAlpha.200", color: "teal.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiMap} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Построить роудмэп
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    Понимаешь, куда хочешь двигаться — собираем дорожку развития: что учить дальше и где закреплять практикой.
                  </Text>
                  <AppButtonLink
                    to="/learn"
                    mt={4}
                    borderRadius="full"
                    variant="outline"
                    w={{ base: "100%", sm: "auto" }}
                  >
                    Построить роудмэп
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
                  bg="orange.50"
                  color="orange.600"
                  _dark={{ bg: "whiteAlpha.200", color: "orange.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiAward} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Вкладываться и получать признание
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    Пиши статьи, добавляй задачи, веди проекты и попадай в “Создатели” — важны польза и качество.
                  </Text>
                  <AppButtonLink to="/creators" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Создатели AIFFA
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
                  bg="pink.50"
                  color="pink.700"
                  _dark={{ bg: "whiteAlpha.200", color: "pink.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiCpu} boxSize={5} aria-hidden="true" />
                </Box>
                <Box minW={0}>
                  <Text fontWeight="bold" color={colors.titleColor}>
                    Работать с ИИ‑помощником
                  </Text>
                  <Text mt={2} fontSize="sm" color={colors.textColor} lineHeight="1.6">
                    ИИ помогает разбирать ошибки, уточнять идеи и проходить проверки быстрее — чтобы ты учился на практике, а не буксовал.
                  </Text>
                  <AppButtonLink to="/weekly" mt={4} borderRadius="full" variant="outline" w={{ base: "100%", sm: "auto" }}>
                    Попробовать на задаче
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

export default FeaturesSection;


