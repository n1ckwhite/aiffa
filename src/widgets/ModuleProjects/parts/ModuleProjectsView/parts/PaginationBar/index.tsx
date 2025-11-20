import React from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { PaginationBarProps } from './types';

export const PaginationBar: React.FC<PaginationBarProps> = ({ pageItems, page, canPrev, canNext, onPrev, onNext, onSelect, colors }) => {
  return (
    <HStack justify="space-between" align="center" pt={2}>
      <IconButton aria-label="Предыдущая страница" icon={<ChevronLeftIcon />} onClick={(e) => { e.preventDefault(); onPrev(); }} isDisabled={!canPrev} variant="ghost" bg={colors.controlsBg} borderWidth="1px" borderColor={colors.controlsBorder} _hover={{ bg: colors.controlsHoverBg }} color={colors.controlsIcon} />
      <HStack>
        {pageItems.map((it, i) => {
          if (typeof it === 'string') {
            return (<Box key={`dots-${i}`} as="span" px={2} color={colors.descColor}>{it}</Box>);
          }
          const isActive = it === page;
          return (
            <IconButton key={it} aria-label={`Страница ${it}`} onClick={(e) => { e.preventDefault(); onSelect(it); }} size="sm" variant={isActive ? 'solid' : 'outline'} colorScheme={isActive ? 'blue' : undefined} bg={isActive ? undefined : colors.controlsBg} borderColor={colors.controlsBorder} _hover={{ bg: isActive ? undefined : colors.controlsHoverBg }} />
          );
        })}
      </HStack>
      <IconButton aria-label="Следующая страница" icon={<ChevronRightIcon />} onClick={(e) => { e.preventDefault(); onNext(); }} isDisabled={!canNext} variant="ghost" bg={colors.controlsBg} borderWidth="1px" borderColor={colors.controlsBorder} _hover={{ bg: colors.controlsHoverBg }} color={colors.controlsIcon} />
    </HStack>
  );
};


