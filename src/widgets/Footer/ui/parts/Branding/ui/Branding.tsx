import React from 'react';
import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { useFooterColors } from '../../../colors/useFooterColors';
import type { BrandingProps } from '../types/Branding.types';

export const Branding: React.FC<BrandingProps> = () => {
  const colors = useFooterColors();
  const currentYear = new Date().getFullYear();

  return (
    <VStack align="start" spacing={3}>
      <HStack spacing={2}>
        <Image
          src="/aiffa.svg"
          alt="Логотип AIFFA"
          boxSize={6}
          pointerEvents="none"
        />
        <Text fontSize="lg" fontWeight="bold" color={colors.titleColor}>
          AIFFA
        </Text>
      </HStack>
      <Text fontSize="sm" color={colors.textColor}>
        © {currentYear} AIFFA. Все права защищены.
      </Text>
    </VStack>
  );
};


