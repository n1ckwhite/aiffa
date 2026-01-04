import type { BoxProps } from "@chakra-ui/react";
import { fadeInUp } from "../../animations";
import type { CourseCardHoverHandlers } from "../hooks/useCourseCardHoverState";

export type BuildCourseCardContainerPropsArgs = {
  isActive: boolean;
  delay: number;
  title: string;
  to?: string;

  cardBg: string;
  cardHoverBg: string;
  borderColor: string;
  accentColor: string;
  shadowColor: string;
  hoverShadowColor: string;
  focusRing: string;
  topGradientEnd: string;
} & CourseCardHoverHandlers;

/**
 * Builds all Chakra props for the clickable card container (Box/AppBoxLink).
 * Pure function (no hooks) to keep CourseCard.tsx small.
 */
export const buildCourseCardContainerProps = ({
  isActive,
  delay,
  title,
  to,
  cardBg,
  cardHoverBg,
  borderColor,
  accentColor,
  shadowColor,
  hoverShadowColor,
  focusRing,
  topGradientEnd,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
}: BuildCourseCardContainerPropsArgs): Omit<BoxProps, "as" | "href"> => {
  return {
    display: "block",
    bg: isActive ? cardHoverBg : cardBg,
    border: "1px",
    borderColor: isActive ? accentColor : borderColor,
    borderRadius: "24px",
    p: { base: 6, md: 8 },
    cursor: "pointer",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: `${fadeInUp} 0.6s ease-out ${delay}ms both`,
    position: "relative",
    overflow: "hidden",
    h: "100%",
    w: "full",
    minW: 0,
    _focusVisible: { boxShadow: focusRing, outline: "none" },
    transform: isActive ? "translateY(-10px) scale(1.02)" : undefined,
    boxShadow: isActive
      ? `0 18px 40px ${hoverShadowColor}, 0 0 0 1px ${accentColor}20`
      : `0 8px 28px ${shadowColor}`,
    _active: { transform: "translateY(-6px) scale(1.01)" },
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    _hover: {
      transform: ["none", null, "translateY(-12px) scale(1.03)"],
      boxShadow: ["0 8px 28px " + shadowColor, null, `0 25px 50px ${hoverShadowColor}, 0 0 0 1px ${accentColor}20`],
      borderColor: [borderColor, null, accentColor],
      bg: [cardBg, null, cardHoverBg],
      textDecoration: "none",
    },
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "5px",
      bg: `linear-gradient(90deg, ${accentColor}, ${topGradientEnd}, ${accentColor})`,
      transform: isActive ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRadius: "24px 24px 0 0",
    },
    _after: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bg: isActive ? `linear-gradient(135deg, ${accentColor}08, transparent)` : "transparent",
      transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: "none",
      borderRadius: "24px",
    },
    className: "course-card",
    style: { textDecoration: "none" },
    "aria-label": to ? `Открыть материал: ${title}` : undefined,
  };
};


