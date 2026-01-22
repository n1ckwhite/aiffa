import React from 'react';
import { Box, HStack, Icon, Text, VStack, useColorModeValue, usePrefersReducedMotion } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiActivity, FiAward, FiMessageCircle, FiTarget, FiUsers } from 'react-icons/fi';
import { useHeroColors } from '../colors/useHeroColors';
import { AppButtonLink } from 'shared/ui/AppLink';
import { useHackathonsCommunityMetrics } from '@/widgets/Hackathons/parts/CommunityGrowthSection/data';

type SocialProofItem = {
  id: string;
  icon: React.ElementType;
  value?: string;
  label: string;
};

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const SocialProofMarquee: React.FC<{ items: SocialProofItem[] }> = ({ items }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.700');
  const strongColor = useColorModeValue('gray.900', 'whiteAlpha.900');
  const dotColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.500');

  const renderItem = (it: SocialProofItem) => (
    <HStack key={it.id} spacing={2} flex="0 0 auto">
      <Icon as={it.icon} boxSize={4} aria-hidden="true" color={dotColor} />
      <Text as="span" fontSize="sm" color={textColor} whiteSpace="nowrap">
        {it.value ? (
          <>
            <Box as="span" fontWeight="bold" color={strongColor}>
              {it.value}
            </Box>{' '}
          </>
        ) : null}
        <Box as="span" fontWeight={it.value ? 'medium' : 'semibold'} color={it.value ? textColor : strongColor}>
          {it.label}
        </Box>
      </Text>
    </HStack>
  );

  const renderRow = (rowKey: string) => (
    <HStack key={rowKey} spacing={8} pr={8} flex="0 0 auto">
      {items.map(renderItem)}
    </HStack>
  );

  if (prefersReducedMotion) {
    return (
      <HStack spacing={3} flexWrap="wrap" justify="center" pt={1}>
        {items.map(renderItem)}
      </HStack>
    );
  }

  return (
    <Box
      w="full"
      maxW={{ base: "100%", md: "760px" }}
      mx="auto"
      pt={1}
      overflow="hidden"
      position="relative"
      sx={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      aria-label="Факты о платформе"
    >
      <Box display="flex" w="max-content" animation={`${marquee} 30s linear infinite`}>
        {renderRow('a')}
        {renderRow('b')}
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {

  const { bg, textColor, titleColor } = useHeroColors();
  const mutedColor = useColorModeValue('gray.600', 'whiteAlpha.700');
  const metrics = useHackathonsCommunityMetrics();
  const participants = metrics.find((m) => m.id === "participants");
  const weeklyTasks = metrics.find((m) => m.id === "weeklyTasks");

  const participantsValue = participants?.valueLabel ?? "—";
  const participantsLabel = participants?.description ?? "активных участников платформы";
  const weeklyValue = weeklyTasks?.valueLabel ?? "—";
  const weeklyLabel = weeklyTasks?.description ?? "решений задач недели";

  const socialProofItems: SocialProofItem[] = [
    { id: "participants", icon: FiUsers, value: participantsValue, label: participantsLabel },
    { id: "weekly", icon: FiTarget, value: weeklyValue, label: weeklyLabel },
    { id: "progress", icon: FiActivity, label: "прогресс виден по действиям" },
    { id: "feedback", icon: FiMessageCircle, label: "фидбек и разборы, когда застрял" },
    { id: "achievements", icon: FiAward, label: "XP и достижения растут вместе с тобой" },
  ];

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

            <SocialProofMarquee items={socialProofItems} />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



