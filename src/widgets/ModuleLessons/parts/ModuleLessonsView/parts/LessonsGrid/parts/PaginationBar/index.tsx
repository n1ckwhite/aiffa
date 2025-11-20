import React from 'react';
import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import type { PaginationBarProps } from './types';

export const PaginationBar: React.FC<PaginationBarProps> = ({ page, setPage, canPrev, canNext, totalPages, pageItems, colors }) => {
  if (totalPages <= 1) return null;
  return (
    <HStack justify="space-between" align="center" pt={2}>
      <IconButton
        aria-label="Предыдущая страница"
        onClick={() => {
          if (canPrev) setPage((p: number) => Math.max(1, p - 1));
        }}
        icon={<ChevronLeftIcon />}
        variant="ghost"
        bg={colors.controlsBg}
        borderWidth="1px"
        borderColor={colors.controlsBorder}
        _hover={{ bg: colors.controlsHoverBg }}
        color={colors.controlsIcon}
        isDisabled={!canPrev}
      />
      <HStack>
        {pageItems.map((it, idx) => {
          if (typeof it === 'string') {
            return (<Box key={`dots-${idx}`} as="span" px={2} color={colors.descColor}>{it}</Box>);
          }
          const isActive = it === page;
          return (
            <Button
              key={it}
              size="sm"
              onClick={() => setPage(it)}
              colorScheme={isActive ? 'blue' : undefined}
              variant={isActive ? 'solid' : 'outline'}
              bg={isActive ? undefined : colors.controlsBg}
              borderColor={colors.controlsBorder}
              _hover={{ bg: isActive ? undefined : colors.controlsHoverBg }}
              borderRadius="md"
            >
              {it}
            </Button>
          );
        })}
      </HStack>
      <IconButton
        aria-label="Следующая страница"
        onClick={() => {
          if (canNext) setPage((p: number) => Math.min(totalPages, p + 1));
        }}
        icon={<ChevronRightIcon />}
        variant="ghost"
        bg={colors.controlsBg}
        borderWidth="1px"
        borderColor={colors.controlsBorder}
        _hover={{ bg: colors.controlsHoverBg }}
        color={colors.controlsIcon}
        isDisabled={!canNext}
      />
    </HStack>
  );
};


