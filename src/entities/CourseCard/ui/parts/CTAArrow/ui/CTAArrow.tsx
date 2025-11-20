import React from 'react';
import { Box } from '@chakra-ui/react';
import { arrowSlide } from '../../../../../CourseCard/animations';
import { useCTAArrowColors } from '../colors/useCTAArrowColors';
import type { CTAArrowProps } from '../types/CTAArrow.types';

export const CTAArrow: React.FC<CTAArrowProps> = ({ isActive, accentColor, arrowHoverColor, hoverShadowColor }) => {
  useCTAArrowColors();
  return (
  <Box position="absolute" bottom={5} right={5} bg="transparent" display="flex" alignItems="center" justifyContent="center" pointerEvents="none">
    <Box
      as="svg"
      w="22px"
      h="22px"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      color={isActive ? arrowHoverColor : accentColor}
      transition="transform 0.25s ease, color 0.25s ease"
      animation={isActive ? `${arrowSlide} 0.8s ease-in-out infinite` : 'none'}
      filter={`drop-shadow(0 2px 6px ${hoverShadowColor})`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </Box>
  </Box>
); };


