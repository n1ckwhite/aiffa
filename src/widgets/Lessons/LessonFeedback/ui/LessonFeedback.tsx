import React from 'react';
import { Box, HStack, Text, IconButton, Fade, Portal } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import useLessonFeedbackColors from './colors/useLessonFeedBackColors';
import { pressDown, pressUp } from '../animations';
import { useFeedbackController } from '../hooks/useFeedbackController';
import { useMinWidthViewport } from '../hooks/useViewport';
import { ThumbDown } from './parts/ThumbDown';
import { ThumbUp } from './parts/ThumbUp';
import { Props } from './types';

const LessonFeedback: React.FC<Props> = ({ lessonKey, questionText }) => {
  const {
    cardBg,
    cardShadow,
    border,
    textCol,
    chipBg,
    chipHover,
    upColor,
    downColor,
    thumbIdleColor,
    selectedThumbColor,
    thanksColor,
  } = useLessonFeedbackColors();
  const isWide = useMinWidthViewport(1025);
  const { choice, mounted, visible, showThanks, pulsing, vote } = useFeedbackController(lessonKey, {
    thanksDelayMs: 250,
    autoHideDelayMs: 1600,
  });

  if (!mounted || !isWide) return null;

  return (
    <Portal>
      <Fade in={visible} unmountOnExit>
        <Box
          position="fixed"
          left={{ base: '16px', md: '24px' }}
          bottom={{ base: `calc(24px + env(safe-area-inset-bottom))`, md: `calc(32px + env(safe-area-inset-bottom))` }}
          zIndex={1200}
          bg={cardBg}
          borderWidth="1px"
          borderColor={border}
          borderRadius="16px"
          px={4}
          py={3}
          boxShadow={cardShadow}
        >
          {!showThanks ? (
            <HStack spacing={3} align="center">
              <Text fontSize="md" fontWeight="semibold" color={textCol} pr={2}>
                {questionText || 'Эта страница была полезна?'}
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
                  onClick={() => vote('up')}
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
                  onClick={() => vote('down')}
                  transition="all 0.15s ease"
                />
              </HStack>
            </HStack>
          ) : (
            <HStack spacing={2} align="center">
              <CheckCircleIcon color={thanksColor} />
              <Text fontSize="md" fontWeight="semibold" color={thanksColor}>Спасибо за ваш отзыв!</Text>
            </HStack>
          )}
        </Box>
      </Fade>
    </Portal>
  );
};

export default LessonFeedback;


