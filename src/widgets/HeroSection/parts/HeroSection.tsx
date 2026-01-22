import React from 'react';
import { Box, VStack, Text, HStack, useColorModeValue } from '@chakra-ui/react';
import { useHeroColors } from '../colors/useHeroColors';
import { AppButtonLink } from 'shared/ui/AppLink';
import { useHackathonsCommunityMetrics } from '@/widgets/Hackathons/parts/CommunityGrowthSection/data';

const HeroSection: React.FC = () => {

  const { bg, textColor, titleColor } = useHeroColors();
  const mutedColor = useColorModeValue('gray.600', 'whiteAlpha.700');
  const metricValueColor = useColorModeValue('gray.900', 'whiteAlpha.900');
  const separatorColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.500');
  const metrics = useHackathonsCommunityMetrics();
  const participants = metrics.find((m) => m.id === "participants");
  const weeklyTasks = metrics.find((m) => m.id === "weeklyTasks");

  return (
    <Box as="section" bg={bg} py={16} px={4} aria-labelledby="homepage-hero-title">
      <Box maxW="1200px" mx="auto">
        <VStack align="center">
          <VStack spacing={5} textAlign="center">
            <VStack as="header" align="center" spacing={2}>
              <Text
                as="p"
                fontSize={{ base: 'sm', md: 'sm' }}
                fontWeight="semibold"
                color={mutedColor}
                letterSpacing="0.18em"
                textTransform="uppercase"
              >
                AIFFA
              </Text>
              <Text
                as="h1"
                id="homepage-hero-title"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="black"
                color={titleColor}
                lineHeight="1.05"
                letterSpacing="-0.03em"
              >
                <Box as="span" display="block">
                Растёшь, когда действуешь. 
                </Box>
                <Box as="span" display="block">
                Вся сила в практике.
                </Box>
              </Text>
            </VStack>

            <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} lineHeight="1.7">
              AIFFA — платформа, где ты растёшь через практику: решаешь задачи, получаешь фидбек и видишь прогресс в профиле.
              Без “когда‑нибудь начну” — только следующий шаг.
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

            <Text fontSize="sm" color={mutedColor} pt={1}>
              <Box as="span" fontWeight="bold" color={metricValueColor}>
                {participants?.valueLabel ?? "—"}
              </Box>{" "}
              <Box as="span" fontWeight="medium">
                {participants?.description ?? "участников"}
              </Box>
              <Box as="span" color={separatorColor} mx={2}>
                •
              </Box>
              <Box as="span" fontWeight="bold" color={metricValueColor}>
                {weeklyTasks?.valueLabel ?? "—"}
              </Box>{" "}
              <Box as="span" fontWeight="medium">
                {weeklyTasks?.description ?? "решений weekly"}
              </Box>
              <Box as="span" color={separatorColor} mx={2}>
                •
              </Box>
              <Box as="span" fontWeight="medium">
                прогресс виден{" "}
              </Box>
              <Box as="span" fontWeight="semibold" color={metricValueColor}>
                по действиям
              </Box>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



