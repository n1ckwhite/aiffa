import React from 'react';
import { HStack, VStack, Box, Text, Icon } from '@chakra-ui/react';
import { useFeaturesSectionColors } from '../../../colors/useFeaturesSectionColors';
import type { FeatureItemProps } from '../types/FeatureItem.types';

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  const colors = useFeaturesSectionColors();
  return (
    <HStack align="start" spacing={4}>
      <Box p={3} borderRadius="12px" bg={colors.iconBg} color={colors.iconColor} flexShrink={0}>
        <Icon as={icon} boxSize="24px" />
      </Box>
      <VStack align="start" spacing={2}>
        <Text fontSize="lg" fontWeight="semibold" color={colors.titleColor}>
          {title}
        </Text>
        <Text fontSize="sm" color={colors.textColor} lineHeight="1.5">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};


