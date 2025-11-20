import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import type { HeaderBlockProps } from '../types/HeaderBlock.types';
import { useFeaturesSectionColors } from '../../../colors/useFeaturesSectionColors';

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ title, description }) => {
  const colors = useFeaturesSectionColors();
  return (
    <VStack spacing={4} textAlign="center" maxW="600px">
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={colors.titleColor}>
        {title}
      </Text>
      <Text fontSize="lg" color={colors.textColor} lineHeight="1.6">
        {description}
      </Text>
    </VStack>
  );
};


