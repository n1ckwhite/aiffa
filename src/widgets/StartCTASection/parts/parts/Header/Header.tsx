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
        Начинайте сейчас
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} lineHeight="1.6">
        Выберите Weekly задачу и превратите усилия в измеримый результат. Здесь рост виден по действиям:
        решения, прогресс и практика складываются в сильный профиль. Подключайтесь к сообществу,
        делитесь материалами, задачами, статьями и проектами. Ваш вклад усиливает других и ускоряет
        вашу карьеру.
      </Text>
    </VStack>
  );
};

export default Header;


