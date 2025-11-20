import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';
import type { ModulesHeaderProps } from '../types/ModulesHeader.types';

const Header: React.FC<ModulesHeaderProps> = () => {
  const theme = useAppColors();
  const titleColor = theme.titleColor;
  const subtitleColor = theme.descColor;
  return (
    <VStack spacing={3} align="center" textAlign="center" pb="32px">
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={titleColor}>
        Материалы для разработчиков
      </Text>
      <Text fontSize="lg" color={subtitleColor} maxW="820px" mx="auto">
        Это не «курс», а живая база знаний сообщества. Здесь ты прокачиваешься через практику,
        готовишься к собеседованиям и находишь свежие материалы с обновлениями. Каждый может внести
        вклад — чем больше вклад, тем сильнее мы делаем экосистему и друг друга.
      </Text>
    </VStack>
  );
};

export default Header;


