import React from 'react';
import { VStack, HStack, Text } from '@chakra-ui/react';
import { useFooterColors } from '../../../colors/useFooterColors';
import type { BrandingProps } from '../types/Branding.types';

export const Branding: React.FC<BrandingProps> = () => {
  const colors = useFooterColors();
  return (
    <VStack align="start" spacing={3}>
      <HStack spacing={2}>
        <Text fontSize="lg" fontWeight="bold" color={colors.titleColor}>
          AIFFA
        </Text>
      </HStack>
      <Text fontSize="sm" color={colors.textColor}>
        Copyright © 2025 AIFFA
      </Text>
    </VStack>
  );
};


