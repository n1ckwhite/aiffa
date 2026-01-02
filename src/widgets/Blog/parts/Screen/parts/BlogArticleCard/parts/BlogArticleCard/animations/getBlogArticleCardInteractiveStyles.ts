import type { BoxProps } from "@chakra-ui/react";

type BlogArticleCardInteractiveParams = {
  accentColor: string;
  cardHoverBorder: string;
  cardHoverShadow: string;
};

export const getBlogArticleCardInteractiveStyles = ({
  accentColor,
  cardHoverBorder,
  cardHoverShadow,
}: BlogArticleCardInteractiveParams): Pick<
  BoxProps,
  "_hover" | "_active" | "_focusVisible" | "_before" | "_after"
> => {
  return {
    _hover: {
      textDecoration: "none",
      transform: "translateY(-3px)",
      borderColor: cardHoverBorder,
      boxShadow: cardHoverShadow,
      _after: { opacity: 1 },
    },
    _active: {
      cursor: "pointer",
      transform: "translateY(-1px)",
    },
    _focusVisible: {
      outline: "3px solid",
      outlineColor: accentColor,
      outlineOffset: "3px",
    },
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      bg: `linear-gradient(90deg, ${accentColor}, rgba(59,130,246,0))`,
      opacity: 0.65,
      pointerEvents: "none",
    },
    _after: {
      content: '""',
      position: "absolute",
      inset: 0,
      bg: `radial-gradient(600px 220px at 20% 0%, ${accentColor}14, transparent 55%)`,
      opacity: 0,
      transition: "opacity 180ms ease",
      pointerEvents: "none",
    },
  };
};


