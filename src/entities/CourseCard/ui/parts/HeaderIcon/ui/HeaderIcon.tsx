import React from 'react';
import { Box } from '@chakra-ui/react';
import { iconBounce } from 'entities/CourseCard/animations';
import { useHeaderIconColors } from '../colors/useHeaderIconColors';
import type { HeaderIconProps } from '../types/HeaderIcon.types';

export const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, accentColor, isActive }) => {
  const { iconBg, iconGradientEnd, iconHoverShadow, iconShadow } = useHeaderIconColors();
  if (!icon) return null;

  return (
    <Box
      p={{ base: 2, sm: 3, md: 4, lg: 5 }}
      borderRadius={{ base: '14px', sm: '16px', md: '18px', lg: '20px' }}
      bg={`linear-gradient(135deg, ${iconBg}, ${iconGradientEnd})`}
      color={accentColor}
      flexShrink={0}
      transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      animation={isActive ? `${iconBounce} 0.8s ease-in-out` : 'none'}
      position="relative"
      _hover={{ transform: 'scale(1.15) rotate(8deg)', boxShadow: `0 12px 30px ${iconHoverShadow}` }}
      boxShadow={`0 6px 20px ${iconShadow}`}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        bg: `linear-gradient(135deg, ${accentColor}20, transparent)`,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Box position="relative" zIndex={1}>{icon}</Box>
    </Box>
  );
};


