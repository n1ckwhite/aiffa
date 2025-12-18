import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import type { PaginationArrowButtonProps } from "../types";
import { handleClick } from "./helpers/shouldHandleClientNavigation";

export const PaginationArrowButton: React.FC<PaginationArrowButtonProps> = ({
  ariaLabel,
  direction,
  isDisabled,
  onClick,
  href,
  colors,
  controlBoxSize,
  iconBoxSize,
  controlBorderRadius,
}) => {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <IconButton
      aria-label={ariaLabel}
      icon={<Icon boxSize={iconBoxSize} />}
      as={href ? ("a" as any) : undefined}
      href={href}
      onClick={(event: React.MouseEvent) => handleClick(href, onClick, event)}
      isDisabled={isDisabled}
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
  );
};


