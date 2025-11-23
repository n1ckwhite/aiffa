import React from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useTaskCompletionColors } from '../../../colors/useTaskCompletionColors';
import { scaleIn } from '../../../animations/scale';
import type { ContentProps } from './types/Content.types';

const Content: React.FC<ContentProps> = ({ completed = true, onClose, onContinue }) => {
  const { cardBg, descColor, checkIcon } = useTaskCompletionColors();
  return (
    <VStack position="relative" zIndex={1} h="100%" align="center" justify="center" spacing={6} px={6}>
      <Box bg={cardBg} borderRadius="2xl" p={{ base: 8, md: 10 }} boxShadow="2xl" textAlign="center" animation={`${scaleIn} 200ms ease-out`}>
        <CheckCircleIcon boxSize={{ base: 16, md: 20 }} color={checkIcon} />
        <Heading as="h3" size="lg" mt={4} letterSpacing="-0.02em">
          {completed ? 'Отлично! Все задачи выполнены' : 'Задача выполнена'}
        </Heading>
        <Text mt={2} color={descColor}>
          {completed ? 'Можно переходить к следующему материалу или повторить упражнения.' : 'Продолжай — награда зачислена, двигаемся дальше.'}
        </Text>
        <Button mt={6} colorScheme="blue" size="lg" onClick={onContinue || onClose}>Продолжить</Button>
      </Box>
    </VStack>
  );
};

export default Content;


