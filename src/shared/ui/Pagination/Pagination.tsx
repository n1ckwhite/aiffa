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

      <Box
        maxW={{ base: "52vw", sm: "56vw", md: "unset" }}
        overflowX={{ base: "auto", md: "visible" }}
        overflowY="hidden"
        sx={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <HStack gap={gap} flexWrap="nowrap">
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
                fontSize={{ base: "sm", md: "sm" }}
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
      </Box>

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


