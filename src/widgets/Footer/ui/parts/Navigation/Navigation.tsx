import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { AppLink } from 'shared/ui/AppLink';
import { useFooterColors } from '../../colors/useFooterColors';

export const Navigation: React.FC = () => {
  const colors = useFooterColors();

  return (
    <VStack align="start" spacing={3}>
      <Text fontSize="md" fontWeight="bold" color={colors.titleColor}>
        Навигация
      </Text>
      <VStack align="start" spacing={2}>
        <AppLink
          to="/weekly"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Задачи недели
        </AppLink>
        <AppLink
          to="/learn"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Материалы
        </AppLink>
        <AppLink
          to="/sessions"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Сессии AIFFA
        </AppLink>
        <AppLink
          to="/creators"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Создатели
        </AppLink>
        <AppLink
          to="/partners"
          fontSize="sm"
          color={colors.textColor}
          _hover={{ color: colors.linkHover }}
          transition="color 0.2s"
          textAlign="left"
        >
          Партнёрство
        </AppLink>
      </VStack>
    </VStack>
  );
};



