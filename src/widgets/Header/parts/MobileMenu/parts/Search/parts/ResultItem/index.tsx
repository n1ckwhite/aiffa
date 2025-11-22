import React from 'react';
import { Box, HStack, ListItem, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import type { ResultItemProps } from './types';
import PillBadge from 'shared/ui/PillBadge';

export const ResultItem: React.FC<ResultItemProps> = ({
  result,
  idx,
  isActive,
  chevronColor,
  chevronHoverColor,
  moduleChipOpacity,
  markBg,
  searchQuery,
  onMouseEnter,
  onResultClick,
  getChipColors,
  resultActiveBg,
  resultHoverBg,
  highlightText,
}) => {
  const colors = getChipColors(result.moduleId);
  const token = colors.text || 'gray.700';
  const prefix = token.split('.')[0] as 'green' | 'yellow' | 'red' | 'gray';
  const scheme: 'green' | 'yellow' | 'red' | 'gray' =
    prefix === 'green' || prefix === 'yellow' || prefix === 'red' ? prefix : 'gray';
  return (
    <ListItem
      role="option"
      aria-selected={isActive}
      bg={isActive ? resultActiveBg : 'transparent'}
      _hover={{ bg: resultHoverBg, cursor: 'pointer' }}
      px={3}
      py={2.5}
      position="relative"
      borderWidth="1px"
      borderColor="transparent"
      borderRadius="lg"
      transition="background-color 180ms ease, box-shadow 180ms ease, transform 140ms ease, border-color 180ms ease"
      onMouseEnter={onMouseEnter}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onResultClick}
    >
      <HStack align="center" justify="space-between" gap={3}>
        <Box flex={1} minW={0}>
          <Text noOfLines={2} fontWeight="semibold">
            {highlightText(result.lessonTitle, searchQuery, markBg)}
          </Text>
          <HStack mt={1} spacing={2}>
            <Box opacity={moduleChipOpacity}>
              <PillBadge colorScheme={scheme} variant="outline">
                {result.moduleTitle}
              </PillBadge>
            </Box>
          </HStack>
        </Box>
        <Box as={ChevronRightIcon} color={isActive ? chevronHoverColor : chevronColor} transition="transform 200ms ease, color 180ms ease" className="result-chevron" />
      </HStack>
    </ListItem>
  );
};



