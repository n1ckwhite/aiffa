import React from 'react';
import { Box } from '@chakra-ui/react';
import type { ModuleIconProps } from './types';
import { moduleIconById } from '../../../ProjectLink/data';

export const ModuleIcon: React.FC<ModuleIconProps> = ({ modId, colors }) => {
  return (
    <Box w={{ base: '40px', sm: '44px', md: '52px' }} h={{ base: '40px', sm: '44px', md: '52px' }} borderRadius="lg" bg={`linear-gradient(135deg, ${colors.iconBg}, ${colors.iconGradientEnd})`} color={colors.headerAccent} boxShadow={`0 6px 20px ${colors.headerBoxShadow}`} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
      <Box position="relative" zIndex={1}>{moduleIconById[modId]}</Box>
    </Box>
  );
};


