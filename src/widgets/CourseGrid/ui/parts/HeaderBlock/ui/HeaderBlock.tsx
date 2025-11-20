import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { useHeaderBlockColors } from '../colors/useHeaderBlockColors';
import type { HeaderBlockProps } from '../types/HeaderBlock.types';

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ title, subtitle }) => {
  const { titleColor, subtitleColor } = useHeaderBlockColors();
  return (
    <VStack spacing={4} textAlign="center" data-index={0}>
      <Text id="course-grid" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color={titleColor}>
        {title}
      </Text>
      <Text fontSize="lg" color={subtitleColor} maxW="600px">
        {subtitle}
      </Text>
    </VStack>
  );
};


