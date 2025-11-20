import React from 'react';
import { Box, HStack, ListItem, Text, Badge } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import type { ResultItemProps } from './types';

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
            <Badge bg={colors.bg} borderColor={colors.border} borderWidth="1px" color={colors.text} opacity={moduleChipOpacity} borderRadius="full" px={2} fontSize={{ base: '10px', md: 'xs' }}>
              {result.moduleTitle.toUpperCase()}
            </Badge>
          </HStack>
        </Box>
        <Box as={ChevronRightIcon} color={isActive ? chevronHoverColor : chevronColor} transition="transform 200ms ease, color 180ms ease" className="result-chevron" />
      </HStack>
    </ListItem>
  );
};



