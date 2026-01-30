import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';
import { useStartCTAColors } from '../../../colors/useStartCTAColors';
import type { HeaderProps } from './types/Header.types';
import { PersonLottieIcon } from "@/shared/icons/components-icon";

const Header: React.FC<HeaderProps> = () => {
  const { titleColor, textColor } = useStartCTAColors();
  return (
    <VStack spacing={3} maxW="760px">
        <Box>
            <PersonLottieIcon />
        </Box>
      <Text id="start-cta-title" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={titleColor}>
        Начинайте сейчас
      </Text>
      <Text id="start-cta-desc" fontSize={{ base: 'md', md: 'lg' }} color={textColor} lineHeight="1.6">
        Начните с нужной темы и повторите базу по фронтенду для собеседования. Короткие блоки помогают
        быстро освежить знания, закрыть пробелы и уверенно отвечать на вопросы.
      </Text>
    </VStack>
  );
};

export default Header;


