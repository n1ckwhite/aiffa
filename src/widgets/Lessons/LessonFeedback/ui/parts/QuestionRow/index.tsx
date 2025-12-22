import React from 'react';
import { HStack, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { pressDown, pressUp } from '../../../animations';
import { ThumbUp } from '../ThumbUp';
import { ThumbDown } from '../ThumbDown';
import { QuestionRowProps } from './types';

export const QuestionRow: React.FC<QuestionRowProps> = ({
  text,
  choice,
  pulsing,
  onVoteUp,
  onVoteDown,
  textCol,
  upColor,
  downColor,
  chipBg,
  chipHover,
  thumbIdleColor,
}) => {
  const selectedThumbColor = useColorModeValue('gray.900', 'white');
  return (
    <HStack spacing={3} align="center" justifyContent="space-between">
      <Text fontSize="md" fontWeight="semibold" color={textCol} pr={2}>
        {text}
      </Text>
      <HStack spacing={2}>
        <IconButton
          aria-label="Полезно"
          icon={<ThumbUp />}
          variant="ghost"
          borderRadius="12px"
          bg={choice === 'up' ? upColor : chipBg}
          color={choice === 'up' ? selectedThumbColor : thumbIdleColor}
          _hover={{ bg: choice === 'up' ? upColor : chipHover }}
          _active={{ transform: 'scale(0.96)' }}
          animation={pulsing === 'up' ? `${pressUp} 0.45s ease` : undefined}
          onClick={onVoteUp}
          transition="all 0.15s ease"
        />
        <IconButton
          aria-label="Не полезно"
          icon={<ThumbDown />}
          variant="ghost"
          borderRadius="12px"
          bg={choice === 'down' ? downColor : chipBg}
          color={choice === 'down' ? selectedThumbColor : thumbIdleColor}
          _hover={{ bg: choice === 'down' ? downColor : chipHover }}
          _active={{ transform: 'scale(0.96)' }}
          animation={pulsing === 'down' ? `${pressDown} 0.45s ease` : undefined}
          onClick={onVoteDown}
          transition="all 0.15s ease"
        />
      </HStack>
    </HStack>
  );
};


