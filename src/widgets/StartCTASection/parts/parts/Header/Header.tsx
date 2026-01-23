import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import type { HeaderProps } from './types/Header.types';
import { PersonLottieIcon } from "@/shared/icons/components-icon";

const Header: React.FC<HeaderProps> = () => {
  const { titleColor, textColor } = useStartCTAColors();
  return (
    <VStack spacing={4} maxW="760px">
        <Box>
            <PersonLottieIcon />
        </Box>
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={titleColor}>
        Готовы начать с первого шага?
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} lineHeight="1.6">
        Стартуйте с Weekly‑задачи: делайте первый шаг уже сегодня, фиксируйте прогресс
        и собирайте результат шаг за шагом. Хотите усилить экосистему — добавляйте материалы,
        задачи, статьи и проекты. Каждый вклад заметен, помогает другим и укрепляет ваш рост.
      </Text>
    </VStack>
  );
};

export default Header;


