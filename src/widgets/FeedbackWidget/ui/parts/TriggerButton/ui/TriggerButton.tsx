import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { useFeedbackWidgetColors } from '../../../colors/useFeedbackWidgetColors';
import type { TriggerButtonProps } from '../types/TriggerButton.types';

export const TriggerButton: React.FC<TriggerButtonProps> = ({ onClick }) => {
  const colors = useFeedbackWidgetColors();
  return (
    <IconButton
      aria-label="Обратная связь"
      icon={<ChatIcon />}
      bg={colors.primaryBg}
      color="white"
      size="lg"
      borderRadius="full"
      onClick={onClick}
      _hover={{
        bg: colors.primaryHoverBg,
        transform: 'scale(1.1)',
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      transition="all 0.2s ease-in-out"
      display={{ base: 'none', md: 'inline-flex' }}
    />
  );
};


