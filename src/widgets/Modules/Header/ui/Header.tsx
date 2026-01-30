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
    >
      <Text
        as="h1"
        id="learn-modules-title"
        fontSize={{ base: '2xl', md: '4xl' }}
        fontWeight="bold"
        color={titleColor}
      >
        Материалы для разработчиков
      </Text>
      <Text fontSize={{base: "md", md: "lg"}} color={subtitleColor} maxW="820px" mx="auto">
        Материалы по фронтенду: подготовка к собеседованиям, освежить забытое и систематизировать знания.
      </Text>
    </VStack>
  );
};

export default Header;


