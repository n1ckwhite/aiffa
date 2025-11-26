import React from 'react';
import { Box, Container, VStack, SimpleGrid } from '@chakra-ui/react';
import { useFeaturesSectionColors } from './colors/useFeaturesSectionColors';
import { HeaderBlock, FeatureItem } from './parts';
import { features } from '../model/data';

const FeaturesSection: React.FC = () => {
  const colors = useFeaturesSectionColors();
  return (
    <Box bg={colors.bg} py={16} px={0}>
      <Container maxW="1200px">
        <VStack spacing={12} align="center">
          <HeaderBlock
            title="Почему выбирают AIFFA?"
            description="AIFFA — открытая экосистема без paywall: задачи, понятные примеры и практика.
Мы растём вместе с сообществом: обратная связь, вклад участников и ваша поддержка
превращаются в новые материалы, проекты и улучшения платформы."
          />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full" maxW="800px">
            {features.map((item, index) => (
              <FeatureItem key={index} {...item} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeaturesSection;


