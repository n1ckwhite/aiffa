import React from 'react';
import { Box } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';
import type { OpenLinkBadgeProps } from './types';
import { useOpenLinkBadgeColors } from './colors/useOpenLinkBadgeColor';

export const OpenLinkBadge: React.FC<OpenLinkBadgeProps> = ({
  accentColor,
  chipBorder,
  dateLabel,
}) => {
  
  const { pillBg } = useOpenLinkBadgeColors();
  return (
    <Box
      as="span"
      fontSize="xs"
      color={accentColor}
      bg={pillBg}
      borderWidth="1px"
      borderColor={chipBorder}
      px={2.5}
      py={1}
      borderRadius="full"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={1}
      whiteSpace="nowrap"
      aria-hidden="true"
    >
      <Box as={FiCalendar} boxSize={3.5} mr={0.5} />
      { dateLabel }
    </Box>
  );
};


