import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';
import type { ModulesHeaderProps } from '../types/ModulesHeader.types';

const Header: React.FC<ModulesHeaderProps> = () => {
  const theme = useAppColors();
  const titleColor = theme.titleColor;
  const subtitleColor = theme.descColor;
  return (
    <VStack
      as="header"
      spacing={3}
      align="center"
      textAlign="center"
      pb="32px"
    >
      <Text
        as="h1"
        id="learn-modules-title"
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="bold"
        color={titleColor}
      >
        Материалы для разработчиков
      </Text>
      <Text fontSize="lg" color={subtitleColor} maxW="820px" mx="auto">
        Это не курс. Это живая база знаний сообщества — актуальные материалы, практика и опыт людей,
        которые уже выросли. Здесь ты готовишься к собеседованию, решаешь реальные задачи и видишь
        свежие обновления. Материалы живут и становятся сильнее с каждым улучшением: любой, кто
        изучил что‑то новое, может предложить правку или добавить своё — так мы вместе усиливаем
        экосистему и друг друга.
      </Text>
    </VStack>
  );
};

export default Header;


