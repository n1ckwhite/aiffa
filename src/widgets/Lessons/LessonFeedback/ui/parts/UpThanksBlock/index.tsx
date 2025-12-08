import React from 'react';
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { UpThanksBlockProps } from './types';

export const UpThanksBlock: React.FC<UpThanksBlockProps> = ({
  thanksColor,
  textCol,
  upColor,
}) => {
  return (
    <VStack align="flex-start" spacing={1.5}>
      <HStack align="center" spacing={2}>
        <CheckCircleIcon boxSize={4} color={thanksColor} />
        <Text fontSize="sm" fontWeight="semibold" color={thanksColor}>
          Спасибо! За ваш отзыв!
        </Text>
      </HStack>
      <VStack align="flex-start" spacing={0.5} fontSize="xs" color={textCol}>
        <Text as="span">Автор увидит вашу поддержку ✨</Text>
        <HStack spacing={1} align="center" fontWeight="semibold" color={upColor}>
          <Text as="span">Поставьте звезду</Text>
          <StarIcon boxSize={3} color={upColor} />
        </HStack>
      </VStack>
    </VStack>
  );
};


