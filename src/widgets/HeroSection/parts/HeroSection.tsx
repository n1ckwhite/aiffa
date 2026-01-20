import React from 'react';
import { Box, VStack, Text, SimpleGrid, HStack, Icon, Divider } from '@chakra-ui/react';
import { FiCode, FiGitPullRequest, FiUsers } from 'react-icons/fi';
import { useHeroColors } from '../colors/useHeroColors';
import PillBadge from 'shared/ui/PillBadge';
import { AppButtonLink, AppLink } from 'shared/ui/AppLink';
import { useHackathonsCommunityMetrics } from '@/widgets/Hackathons/parts/CommunityGrowthSection/data';

const HeroSection: React.FC = () => {

  const { bg, textColor, titleColor } = useHeroColors();
  const metrics = useHackathonsCommunityMetrics();
  const participants = metrics.find((m) => m.id === "participants");
  const weeklyTasks = metrics.find((m) => m.id === "weeklyTasks");
  const participantsLabel = participants ? `Уже ${participants.valueLabel} ${participants.description}` : null;
  const weeklyTasksLabel = weeklyTasks ? `${weeklyTasks.valueLabel} ${weeklyTasks.description}` : null;

  return (
    <Box as="section" bg={bg} py={16} px={4} aria-labelledby="homepage-hero-title">
      <Box maxW="1200px" mx="auto">
        <VStack align="center">
          <VStack spacing={6} textAlign="center" maxW="full">
            <VStack as="header" align="center" spacing={1}>
              <Text
                as="h1"
                id="homepage-hero-title"
                fontSize={{ base: '5xl', md: '6xl' }}
                fontWeight="black"
                color={titleColor}
                lineHeight="1"
                display="inline-flex"
                px={{ base: 5, md: 6 }}
                py={{ base: 2, md: 2.5 }}
                borderRadius="2xl"
                letterSpacing="-0.02em"
              >
                AIFFA
              </Text>
              <Text
                as="p"
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight="semibold"
                color={textColor}
                letterSpacing="0.14em"
                textTransform="uppercase"
              >
                Экосистема развития разработчиков
              </Text>
              <PillBadge colorScheme="blue" variant="outline">
                Практика → фидбек → рост
              </PillBadge>
            </VStack>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              lineHeight="1.6"
              maxW="full"
            >
              Всё в одном месте: задачи, материалы с практикой, проекты, события и вклад в экосистему.
              Пишешь код прямо на платформе во встроенной IDE — и сразу видишь, что улучшить: через проверки, разбор ошибок и честный фидбек.
              Без хаоса и “я когда‑нибудь начну”: выбираешь направление, делаешь шаги регулярно и превращаешь знания в результат, который видно в профиле.
            </Text>

            <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center" pt={1}>
              <AppButtonLink
                to="/weekly"
                colorScheme="blue"
                borderRadius="full"
                px={{ base: 6, md: 7 }}
                h={{ base: 12, md: 12 }}
                fontWeight="bold"
                boxShadow="0 10px 26px rgba(15, 23, 42, 0.10)"
              >
                Решить первую задачу
              </AppButtonLink>
              <AppButtonLink
                to="/learn"
                variant="outline"
                borderRadius="full"
                px={{ base: 6, md: 7 }}
                h={{ base: 12, md: 12 }}
                fontWeight="bold"
              >
                Построить роудмэп
              </AppButtonLink>
            </HStack>

            <HStack spacing={3} flexWrap="wrap" justify="center" pt={0.5}>
              <AppLink to="/learn" fontWeight="semibold" aria-label="Открыть страницу Learn">
                Как устроено
              </AppLink>
              <Divider orientation="vertical" h="16px" borderColor="whiteAlpha.300" />
              <AppLink to="/creators" fontWeight="semibold" aria-label="Перейти к странице Создатели">
                Создатели
              </AppLink>
              <Divider orientation="vertical" h="16px" borderColor="whiteAlpha.300" />
              <AppLink to="/partners" fontWeight="semibold" aria-label="Перейти к странице Партнёрство для компаний">
                Для бизнеса
              </AppLink>
            </HStack>

            <HStack spacing={2} flexWrap="wrap" justify="center" pt={0.5}>
              {participantsLabel ? (
                <PillBadge colorScheme="green" variant="solid" uppercase={false}>
                  {participantsLabel}
                </PillBadge>
              ) : null}
              {weeklyTasksLabel ? (
                <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                  {weeklyTasksLabel}
                </PillBadge>
              ) : null}
              <PillBadge colorScheme="orange" variant="solid" uppercase={false}>
                XP и достижения растут вместе с тобой
              </PillBadge>
            </HStack>
          </VStack>
          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={{ base: 3, md: 5 }} 
            w="full" 
            maxW="1100px"
            mt={{ base: 7, md: 10 }}
            className="hero-stats"
          >
            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 4, md: 5 }}
              textAlign="left"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="xl"
                  bg="blue.50"
                  color="blue.600"
                  _dark={{ bg: "whiteAlpha.200", color: "blue.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiCode} boxSize={5} aria-hidden="true" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color={titleColor}>
                    Код прямо на платформе
                  </Text>
                  <Text mt={1} fontSize="sm" color={textColor} lineHeight="1.6">
                    Открываешь задачу и пишешь решение во встроенной IDE.
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 4, md: 5 }}
              textAlign="left"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="xl"
                  bg="purple.50"
                  color="purple.700"
                  _dark={{ bg: "whiteAlpha.200", color: "purple.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiGitPullRequest} boxSize={5} aria-hidden="true" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color={titleColor}>
                    Вклад виден и ценится
                  </Text>
                  <Text mt={1} fontSize="sm" color={textColor} lineHeight="1.6">
                    Добавляй задачи, статьи, проекты и улучшения — это часть твоей истории.
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box
              borderWidth="1px"
              borderColor="blackAlpha.200"
              _dark={{ borderColor: "whiteAlpha.200" }}
              borderRadius="2xl"
              p={{ base: 4, md: 5 }}
              textAlign="left"
            >
              <HStack spacing={3} align="flex-start">
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="xl"
                  bg="green.50"
                  color="green.600"
                  _dark={{ bg: "whiteAlpha.200", color: "green.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiUsers} boxSize={5} aria-hidden="true" />
                </Box>
                <Box>
                  <Text fontWeight="bold" color={titleColor}>
                    Команда и события
                  </Text>
                  <Text mt={1} fontSize="sm" color={textColor} lineHeight="1.6">
                    Хакатоны, сессии, консультации и нетворкинг — чтобы расти не в одиночку.
                  </Text>
                </Box>
              </HStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



