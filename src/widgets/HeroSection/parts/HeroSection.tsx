import React from 'react';
import { Box, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useHeroColors } from '../colors/useHeroColors';
import PillBadge from 'shared/ui/PillBadge';

const HeroSection: React.FC = () => {

  const { bg, textColor, titleColor } = useHeroColors();

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
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeroSection;



