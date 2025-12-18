import React from "react";
import { Button } from "@chakra-ui/react";
import type { PaginationPageButtonProps } from "../types";

const shouldHandleClientNavigation = (event: React.MouseEvent) => {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return false;
  return true;
};

export const PaginationPageButton: React.FC<PaginationPageButtonProps> = ({
  page,
  isActive,
  onSelect,
  href,
  colors,
  controlBoxSize,
  controlBorderRadius,
}) => {
  return (
    <Button
      size="sm"
      as={href ? ("a" as any) : undefined}
      href={href}
      onClick={(e: React.MouseEvent) => {
        if (!href) {
          onSelect(page);
          return;
        }
        if (!shouldHandleClientNavigation(e)) return;
        e.preventDefault();
        onSelect(page);
      }}
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
      {page}
    </Button>
  );
};


