import React from 'react';
import { Box, VStack, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import { useHeroColors } from '../colors/useHeroColors';
import { pulse } from '../animations/pulse';
import { fadeInUp } from '../animations/fadeInUp';
import { quotes } from '../data/quotes';
import { highlights } from '../data/highlights';
import { highlightColors } from '../data/constants';
import PillBadge from 'shared/ui/PillBadge';
import { useStaggeredDelay } from '../hooks/useStaggeredDelay';
import { useRotatingIndex } from '../hooks/useRotatingIndex';
import { useStatsVisibility } from '../hooks/useStatsVisibility';

const HeroSection: React.FC = () => {
  const statsVisible = useStatsVisibility();
  const getDelay = useStaggeredDelay({ baseCols: 2, mdCols: 3, lgCols: 6 });
  useRotatingIndex(quotes.length, 6000);

  const { bg, textColor, titleColor, iconBgTone, iconColorTone } = useHeroColors();

  return (
    <Box as="section" bg={bg} py={16} px={4} aria-labelledby="homepage-hero-title">
      <Box maxW="1200px" mx="auto">
        <VStack spacing={12} align="center">
          <VStack spacing={6} textAlign="center" maxW="full">
            <VStack as="header" align="center" spacing={1}>
              <Text
                as="h1"
                id="homepage-hero-title"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color={titleColor}
                lineHeight="1.1"
              >
                Добро пожаловать в AIFFA!
              </Text>
              <PillBadge colorScheme="blue" variant="outline">
                Новая экосистема IT
              </PillBadge>
            </VStack>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              lineHeight="1.6"
              maxW="full"
            >
              AIFFA — это не курсы. Это среда роста разработчиков.
Здесь ты не смотришь уроки, а делаешь: решаешь реальные задачи, участвуешь в хакатонах, собираешь команды и выпускаешь свои проекты.

Выбирай направление — Frontend, Backend, Mobile, Data, DevOps — и прокачивайся через практику, ревью и поддержку сообщества.

Каждый может стать автором изменений: придумать задачу недели, запустить мини‑ивент, предложить фичу или помочь новичку.

Всё открыто и бесплатно. Чем больше твой вклад, тем выше уровень, шире сеть контактов и сильнее становится AIFFA. 
            </Text>

          </VStack>
          <SimpleGrid 
            columns={{ base: 2, md: 3, lg: 6 }} 
            spacing={5} 
            w="full" 
            maxW="1100px" 
            className="hero-stats"
          >
            {highlights.map((h, index) => {
              const color = highlightColors[index % highlightColors.length];
              return (
                <Box
                  key={index}
                  p={3}
                  borderRadius="xl"
                  textAlign="center"
                  transition="all 0.2s ease"
                  _hover={{ transform: 'translateY(-2px)' }}
                  position="relative"
                  overflow="visible"
                  animation={statsVisible ? `${fadeInUp} 520ms ease-out both` : 'none'}
                  style={{ animationDelay: `${getDelay(index)}s` }}
                >
                  <VStack spacing={2} position="relative" zIndex={1}>
                    <Box
                      w={{ base: '48px', md: '48px' }}
                      h={{ base: '48px', md: '48px' }}
                      borderRadius="full"
                      bg={`${color}.${iconBgTone}`}
                      color={`${color}.${iconColorTone}`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon 
                        as={h.icon} 
                        boxSize={{ base: '16px', md: '16px' }} 
                        color="currentColor"
                        animation={statsVisible ? `${pulse} 2s ease-in-out infinite` : 'none'}
                        style={{ animationDelay: `${getDelay(index) + 0.2}s` }}
                      />
                    </Box>
                    <Text fontSize="sm" color={textColor} fontWeight="semibold">
                      {h.label}
                    </Text>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



