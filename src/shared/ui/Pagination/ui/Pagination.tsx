import React from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import type { PaginationProps } from "../types";
import { getLastPage } from "../helpers/getLastPage";
import { getCompactPages } from "../helpers/getCompactPages";
import { PaginationArrowButton, PaginationDots, PaginationPageButton } from "./parts";

/**
 * Shared pagination control.
 * - `base`: arrows + compact page buttons (no overflow/scroll)
 * - `sm`: arrows + more page buttons
 * - `md+`: uses full `pageItems` coming from pagination hook
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
  const controlBoxSize = { base: 8, md: 10 } as const; // 32px -> 40px
  const iconBoxSize = { base: 4, md: 5 } as const;
  const controlBorderRadius = { base: "10px", md: "12px" } as const;
  const gap = { base: 1, md: 2 } as const;

  const lastPage = React.useMemo(() => getLastPage(pageItems, page), [pageItems, page]);
  const mobilePages6 = React.useMemo(() => getCompactPages({ page, lastPage, limit: 6 }), [page, lastPage]);
  const mobilePages8 = React.useMemo(() => getCompactPages({ page, lastPage, limit: 8 }), [page, lastPage]);

  const handleSelect = (p: number) => onSelect(p);

  return (
    <Flex w="100%" justify="space-between" align="center" pt={2} gap={gap} flexWrap="nowrap" maxW="100%">
      <PaginationArrowButton
        ariaLabel="Предыдущая страница"
        direction="prev"
        isDisabled={!canPrev}
        onClick={onPrev}
        colors={colors}
        controlBoxSize={controlBoxSize}
        iconBoxSize={iconBoxSize}
        controlBorderRadius={controlBorderRadius}
      />

      <Box flex="1" minW={0} display="flex" justifyContent="center">
        {/* Base mobile (iPhone 4): arrows + 6 smart page buttons */}
        <HStack gap={gap} flexWrap="nowrap" display={{ base: "flex", sm: "none" }}>
          {mobilePages6.map((p) => {
            const isActive = p === page;
            return (
              <PaginationPageButton
                key={p}
                page={p}
                isActive={isActive}
                onSelect={handleSelect}
                colors={colors}
                controlBoxSize={controlBoxSize}
                controlBorderRadius={controlBorderRadius}
              />
            );
          })}
        </HStack>

        {/* Small screens (>= sm): arrows + up to 8 smart page buttons */}
        <HStack gap={gap} flexWrap="nowrap" display={{ base: "none", sm: "flex", md: "none" }}>
          {mobilePages8.map((p) => {
            const isActive = p === page;
            return (
              <PaginationPageButton
                key={p}
                page={p}
                isActive={isActive}
                onSelect={handleSelect}
                colors={colors}
                controlBoxSize={controlBoxSize}
                controlBorderRadius={controlBorderRadius}
              />
            );
          })}
        </HStack>

        {/* Desktop/tablet: full pagination items */}
        <HStack gap={gap} flexWrap="nowrap" display={{ base: "none", md: "flex" }}>
          {pageItems.map((it, idx) => {
            if (typeof it === "string") {
              return <PaginationDots key={`dots-${idx}`} value={it} colors={colors} />;
            }

            const isActive = it === page;
            return (
              <PaginationPageButton
                key={it}
                page={it}
                isActive={isActive}
                onSelect={handleSelect}
                colors={colors}
                controlBoxSize={controlBoxSize}
                controlBorderRadius={controlBorderRadius}
              />
            );
          })}
        </HStack>
      </Box>

      <PaginationArrowButton
        ariaLabel="Следующая страница"
        direction="next"
        isDisabled={!canNext}
        onClick={onNext}
        colors={colors}
        controlBoxSize={controlBoxSize}
        iconBoxSize={iconBoxSize}
        controlBorderRadius={controlBorderRadius}
      />
    </Flex>
  );
};


