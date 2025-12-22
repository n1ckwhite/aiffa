import React from 'react';
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { UpThanksBlockProps } from './types';

export const UpThanksBlock: React.FC<UpThanksBlockProps> = ({
  thanksColor,
  textCol,
  upColor,
  onSupportClick,
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
        <Button
          type="button"
          variant="link"
          size="xs"
          px={0}
          py={0}
          height="auto"
          minW="auto"
          color={upColor}
          fontWeight="semibold"
          display="inline-flex"
          alignItems="center"
          gap={1}
          leftIcon={<StarIcon boxSize={3} />}
          onClick={() => {
            if (!onSupportClick) return;
            try {
              onSupportClick();
            } catch {
              // ignore
            }
          }}
        >
          Поставьте звезду
        </Button>
      </VStack>
    </VStack>
  );
};


