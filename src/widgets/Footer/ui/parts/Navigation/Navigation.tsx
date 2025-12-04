import React from 'react';
import { VStack, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFooterColors } from '../../colors/useFooterColors';

export const Navigation: React.FC = () => {
  const colors = useFooterColors();

  return (
    <VStack align="start" spacing={3}>
      <Text fontSize="md" fontWeight="bold" color={colors.titleColor}>
        Навигация
      </Text>
      <VStack align="start" spacing={2}>
        <Link
          as={RouterLink as any}
          to="/weekly"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Задачи недели
        </Link>
        <Link
          as={RouterLink as any}
          to="/learn"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Материалы
        </Link>
        <Link
          as={RouterLink as any}
          to="/sessions"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Сессии AIFFA
        </Link>
        <Link
          as={RouterLink as any}
          to="/partners"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Партнёрство
        </Link>
      </VStack>
    </VStack>
  );
};



