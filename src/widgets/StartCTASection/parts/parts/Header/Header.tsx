import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import type { HeaderProps } from './types/Header.types';
import Image from "next/image";
import iconImage from "shared/test/icon_3.webp";

const Header: React.FC<HeaderProps> = () => {
  const { titleColor, textColor } = useStartCTAColors();
  return (
    <VStack spacing={4} maxW="760px">
        <Box maxW="350px" mx="auto">
            <Image
                src={iconImage}
                alt="Комьюнити AIFFA"
            />
        </Box>
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={titleColor}>
        Готовы начать изучение?
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} lineHeight="1.6">
        Все материалы бесплатны и доступны без регистрации. Поддержите звёздой или донатом —
        это ускорит запуск сервера, бэкенда, личных страниц пользователей и системы достижений и рейтингов,
        а также позволит выпускать больше новых материалов.
      </Text>
    </VStack>
  );
};

export default Header;


