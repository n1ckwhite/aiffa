import React from 'react';
import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import type { PaginationProps } from './types';

export const Pagination: React.FC<PaginationProps> = ({
  pageItems,
  page,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onSelect,
  colors,
}) => {
  return (
    <HStack justify="space-between" align="center" pt={2}>
      <IconButton aria-label="Предыдущая страница" icon={<ChevronLeftIcon />} onClick={onPrev} isDisabled={!canPrev} variant="ghost" bg={colors.controlsBg} borderWidth="1px" borderColor={colors.controlsBorder} _hover={{ bg: colors.controlsHoverBg }} color={colors.controlsIcon} />
      <HStack>
        {pageItems.map((it, idx) => {
          if (typeof it === 'string') {
            return (<Box key={`dots-${idx}`} as="span" px={2} color={colors.descColor}>{it}</Box>);
          }
          const isActive = it === page;
          return (
            <Button key={it} size="sm" onClick={() => onSelect(it)} colorScheme={isActive ? 'blue' : undefined} variant={isActive ? 'solid' : 'outline'} bg={isActive ? undefined : colors.controlsBg} borderColor={colors.controlsBorder} _hover={{ bg: isActive ? undefined : colors.controlsHoverBg }}>
              {it}
            </Button>
          );
        })}
      </HStack>
      <IconButton aria-label="Следующая страница" icon={<ChevronRightIcon />} onClick={onNext} isDisabled={!canNext} variant="ghost" bg={colors.controlsBg} borderWidth="1px" borderColor={colors.controlsBorder} _hover={{ bg: colors.controlsHoverBg }} color={colors.controlsIcon} />
    </HStack>
  );
};


