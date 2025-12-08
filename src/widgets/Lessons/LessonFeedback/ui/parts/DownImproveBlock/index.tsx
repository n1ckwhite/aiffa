import React from 'react';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { DownImproveBlockProps, ImproveReason } from './types';

export const DownImproveBlock: React.FC<DownImproveBlockProps> = ({
  improveReason,
  onChangeReason,
  texts,
  thanksColor,
  textCol,
  chipBg,
  chipHover,
  border,
}) => {
  const handleSelect = (reason: ImproveReason) => {
    onChangeReason(reason);
  };

  return (
    <VStack align="flex-start" spacing={2}>
      <Text fontSize="sm" fontWeight="semibold" color={thanksColor}>
        Спасибо за обратную связь!
      </Text>
      {!improveReason ? (
        <VStack align="flex-start" spacing={2} pt={0.5} w="100%">
          <Text fontSize="xs" color={textCol}>
            Можно улучшить что-то?
          </Text>
          <HStack spacing={2} flexWrap="wrap" w="100%">
            <Button
              size="sm"
              px={4}
              py={1}
              borderRadius="full"
              variant={improveReason === 'short' ? 'solid' : 'outline'}
              bg={improveReason === 'short' ? chipHover : chipBg}
              _hover={{ bg: chipHover }}
              _active={{ bg: chipHover }}
              borderColor={border}
              color={improveReason === 'short' ? 'white' : textCol}
              minW="max-content"
              onClick={() => handleSelect('short')}
            >
              {texts.shortLabel}
            </Button>
            <Button
              size="sm"
              px={4}
              py={1}
              borderRadius="full"
              variant={improveReason === 'hard' ? 'solid' : 'outline'}
              bg={improveReason === 'hard' ? chipHover : chipBg}
              _hover={{ bg: chipHover }}
              _active={{ bg: chipHover }}
              borderColor={border}
              color={improveReason === 'hard' ? 'white' : textCol}
              minW="max-content"
              onClick={() => handleSelect('hard')}
            >
              {texts.hardLabel}
            </Button>
            <Button
              size="sm"
              px={4}
              py={1}
              borderRadius="full"
              variant={improveReason === 'errors' ? 'solid' : 'outline'}
              bg={improveReason === 'errors' ? chipHover : chipBg}
              _hover={{ bg: chipHover }}
              _active={{ bg: chipHover }}
              borderColor={border}
              color={improveReason === 'errors' ? 'white' : textCol}
              minW="max-content"
              onClick={() => handleSelect('errors')}
            >
              {texts.errorsLabel}
            </Button>
          </HStack>
        </VStack>
      ) : (
        <Text fontSize="xs" color={textCol} pt={0.5}>
          {improveReason === 'short' && texts.shortExplanation}
          {improveReason === 'hard' && texts.hardExplanation}
          {improveReason === 'errors' && texts.errorsExplanation}
        </Text>
      )}
    </VStack>
  );
};


