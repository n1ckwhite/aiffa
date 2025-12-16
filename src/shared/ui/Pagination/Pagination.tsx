import React from "react";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import type { PaginationProps } from "./types";

/**
 * Shared pagination control (MV3-safe UI, used across pages).
 * Responsive: on small screens page numbers can scroll horizontally.
 */
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
  // iPhone 4 / very small screens: make controls tighter and rely on horizontal scroll for page items if needed.
  const controlBoxSize = { base: 8, md: 10 } as const; // 32px -> 40px
  const iconBoxSize = { base: 4, md: 5 } as const;
  const controlBorderRadius = { base: "10px", md: "12px" } as const;
  const gap = { base: 1, md: 2 } as const;

  const lastPage = React.useMemo(() => {
    const nums = pageItems.filter((it): it is number => typeof it === "number");
    const computed = nums.length > 0 ? Math.max(...nums) : page;
    return Number.isFinite(computed) && computed > 0 ? computed : page;
  }, [pageItems, page]);

  const getCompactPages = React.useCallback(
    (limit: number) => {
      if (lastPage <= limit) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
      }

      const mid = Math.max(1, Math.min(lastPage, Math.ceil(lastPage / 2)));
      const required = Array.from(new Set([1, mid, lastPage]));

      const isInMiddleRange = (p: number) => p > 1 && p < lastPage;
      const addUnique = (arr: number[], value: number) => {
        if (!Number.isFinite(value)) return;
        if (value < 1 || value > lastPage) return;
        if (arr.includes(value)) return;
        arr.push(value);
      };

      // Start with required pages (start/middle/end), then add current neighborhood.
      const acc: number[] = [...required];
      [page - 1, page, page + 1].filter(isInMiddleRange).forEach((p) => addUnique(acc, p));

      // Fill up to `limit` with pages around current page.
      for (let offset = 2; acc.length < limit && offset <= lastPage; offset += 1) {
        addUnique(acc, page - offset);
        if (acc.length >= limit) break;
        addUnique(acc, page + offset);
      }

      // Final fallback: fill from the beginning (excluding first/last).
      for (let p = 2; acc.length < limit && p <= lastPage - 1; p += 1) {
        addUnique(acc, p);
      }

      // If somehow we got more than `limit`, keep start/middle/end and nearest pages to current.
      const unique = Array.from(new Set(acc));
      if (unique.length <= limit) return unique.sort((a, b) => a - b);

      const requiredSet = new Set(required);
      const others = unique
        .filter((p) => !requiredSet.has(p))
        .sort((a, b) => Math.abs(a - page) - Math.abs(b - page));
      const limited = [...required, ...others.slice(0, Math.max(0, limit - required.length))];
      return Array.from(new Set(limited)).sort((a, b) => a - b);
    },
    [lastPage, page],
  );

  const mobilePages4 = React.useMemo(() => getCompactPages(4), [getCompactPages]);
  const mobilePages6 = React.useMemo(() => getCompactPages(6), [getCompactPages]);

  return (
    <HStack justify="center" align="center" pt={2} gap={gap} flexWrap="nowrap" maxW="100%">
      <IconButton
        aria-label="Предыдущая страница"
        icon={<ChevronLeftIcon boxSize={iconBoxSize} />}
        onClick={onPrev}
        isDisabled={!canPrev}
        variant="outline"
        boxSize={controlBoxSize}
        minW={controlBoxSize}
        flexShrink={0}
        borderRadius={controlBorderRadius}
        bg={colors.controlsBg}
        borderWidth="1px"
        borderColor={colors.controlsBorder}
        _hover={{ bg: colors.controlsHoverBg }}
        _active={{ transform: "translateY(1px)" }}
        _focusVisible={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.35)" }}
        color={colors.controlsIcon}
      />

      {/* Base mobile (iPhone 4): arrows + 4 smart page buttons */}
      <HStack gap={gap} flexWrap="nowrap" display={{ base: "flex", sm: "none" }}>
        {mobilePages4.map((p) => {
          const isActive = p === page;
          return (
            <Button
              key={p}
              size="sm"
              onClick={() => onSelect(p)}
              aria-current={isActive ? "page" : undefined}
              colorScheme={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
              boxSize={controlBoxSize}
              minW={controlBoxSize}
              flexShrink={0}
              px={0}
              borderRadius={controlBorderRadius}
              fontWeight={isActive ? "semibold" : "medium"}
              fontSize="sm"
              bg={isActive ? undefined : colors.controlsBg}
              borderColor={colors.controlsBorder}
              _hover={{ bg: isActive ? undefined : colors.controlsHoverBg }}
              _active={{ transform: "translateY(1px)" }}
              _focusVisible={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.35)" }}
            >
              {p}
            </Button>
          );
        })}
      </HStack>

      {/* Small screens (>= sm): arrows + up to 6 smart page buttons */}
      <HStack gap={gap} flexWrap="nowrap" display={{ base: "none", sm: "flex", md: "none" }}>
        {mobilePages6.map((p) => {
          const isActive = p === page;
          return (
            <Button
              key={p}
              size="sm"
              onClick={() => onSelect(p)}
              aria-current={isActive ? "page" : undefined}
              colorScheme={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
              boxSize={controlBoxSize}
              minW={controlBoxSize}
              flexShrink={0}
              px={0}
              borderRadius={controlBorderRadius}
              fontWeight={isActive ? "semibold" : "medium"}
              fontSize="sm"
              bg={isActive ? undefined : colors.controlsBg}
              borderColor={colors.controlsBorder}
              _hover={{ bg: isActive ? undefined : colors.controlsHoverBg }}
              _active={{ transform: "translateY(1px)" }}
              _focusVisible={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.35)" }}
            >
              {p}
            </Button>
          );
        })}
      </HStack>

      {/* Desktop/tablet: full pagination items */}
      <HStack gap={gap} flexWrap="nowrap" display={{ base: "none", md: "flex" }}>
        {pageItems.map((it, idx) => {
          if (typeof it === "string") {
            return (
              <Box key={`dots-${idx}`} as="span" px={1} color={colors.descColor} userSelect="none" flexShrink={0}>
                {it}
              </Box>
            );
          }

          const isActive = it === page;
          return (
            <Button
              key={it}
              size="sm"
              onClick={() => onSelect(it)}
              aria-current={isActive ? "page" : undefined}
              colorScheme={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
              boxSize={controlBoxSize}
              minW={controlBoxSize}
              flexShrink={0}
              px={0}
              borderRadius={controlBorderRadius}
              fontWeight={isActive ? "semibold" : "medium"}
              fontSize="sm"
              bg={isActive ? undefined : colors.controlsBg}
              borderColor={colors.controlsBorder}
              _hover={{ bg: isActive ? undefined : colors.controlsHoverBg }}
              _active={{ transform: "translateY(1px)" }}
              _focusVisible={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.35)" }}
            >
              {it}
            </Button>
          );
        })}
      </HStack>

      <IconButton
        aria-label="Следующая страница"
        icon={<ChevronRightIcon boxSize={iconBoxSize} />}
        onClick={onNext}
        isDisabled={!canNext}
        variant="outline"
        boxSize={controlBoxSize}
        minW={controlBoxSize}
        flexShrink={0}
        borderRadius={controlBorderRadius}
        bg={colors.controlsBg}
        borderWidth="1px"
        borderColor={colors.controlsBorder}
        _hover={{ bg: colors.controlsHoverBg }}
        _active={{ transform: "translateY(1px)" }}
        _focusVisible={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.35)" }}
        color={colors.controlsIcon}
      />
    </HStack>
  );
};


