import React from 'react';
import { VStack, Text, Link, Box } from '@chakra-ui/react';
import { useFooterColors } from '../../../colors/useFooterColors';
import type { SupportProps } from '../types/Support.types';

export const Support: React.FC<SupportProps> = ({ onDonate }) => {
  const colors = useFooterColors();
  return (
    <VStack align="start" spacing={3}>
      <Text fontSize="md" fontWeight="bold" color={colors.titleColor}>
        Поддержка
      </Text>
      <VStack align="start" spacing={2}>
        <Box
          as="button"
          onClick={onDonate}
          fontSize="sm"
          color={colors.donateColor}
          _hover={{ color: colors.donateColor, opacity: 0.9 }}
          transition="color 0.2s"
          textAlign="left"
          fontWeight="semibold"
        >
          Поддержать проект
        </Box>
        <Link
          href="https://t.me/iamceob1tch"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          isExternal
        >
          Сообщить об ошибке
        </Link>
        <Link
          href="https://t.me/iamceob1tch"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          isExternal
        >
          Предложить улучшение
        </Link>
      </VStack>
    </VStack>
  );
};


