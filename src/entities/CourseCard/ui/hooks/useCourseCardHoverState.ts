import React from "react";

export type UseCourseCardHoverStateArgs = {
  forceActive?: boolean;
};

export type CourseCardHoverHandlers = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
};

/**
 * Encapsulates hover/touch behavior for CourseCard.
 * Keeps the same interaction semantics as the old inline implementation.
 */
export const useCourseCardHoverState = ({ forceActive = false }: UseCourseCardHoverStateArgs) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);

  // On touch devices we avoid “sticky hover” effects.
  const handleTouchStart = React.useCallback(() => setIsHovered(false), []);
  const handleTouchEnd = React.useCallback(() => setIsHovered(false), []);
  const handleTouchCancel = React.useCallback(() => setIsHovered(false), []);

  const isActive = isHovered || forceActive;

  const handlers: CourseCardHoverHandlers = React.useMemo(
    () => ({
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
    }),
    [handleMouseEnter, handleMouseLeave, handleTouchCancel, handleTouchEnd, handleTouchStart],
  );

  return { isActive, handlers };
};


