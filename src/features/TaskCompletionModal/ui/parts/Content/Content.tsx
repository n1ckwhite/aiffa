import React from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useTaskCompletionColors } from '../../../colors/useTaskCompletionColors';
import { scaleIn } from '../../../animations/scale';
import type { ContentProps } from './types/Content.types';
import { useTaskCompletionContent } from './hooks/useTaskCompletionContent';

const Content: React.FC<ContentProps> = ({ completed = true, onClose, onContinue, context = 'lesson' }) => {
  const { cardBg, descColor, checkIcon } = useTaskCompletionColors();
  const { title, description } = useTaskCompletionContent({ completed, context });

  return (
    <VStack position="relative" zIndex={1} h="100%" align="center" justify="center" spacing={6} px={6}>
      <Box
        bg={cardBg}
        borderRadius="2xl"
        p={{ base: 8, md: 10 }}
        boxShadow="2xl"
        textAlign="center"
        animation={`${scaleIn} 200ms ease-out`}
      >
        <CheckCircleIcon boxSize={{ base: 16, md: 20 }} color={checkIcon} />
        <Heading as="h3" size="lg" mt={4} letterSpacing="-0.02em">
          {title}
        </Heading>
        <Text mt={2} color={descColor}>
          {description}
        </Text>
        <Button mt={6} colorScheme="blue" size="lg" onClick={onContinue || onClose}>
          Продолжить
        </Button>
      </Box>
    </VStack>
  );
};

export default Content;


