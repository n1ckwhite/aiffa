"use client";

import React from "react";
import { Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FiStar } from "react-icons/fi";
import { useStarRatingColors } from "./colors";
import { StarRatingIconProps } from "./types";

export const StarRatingIcon: React.FC<StarRatingIconProps> = ({
  isActive,
  activeBoxSize = 3,
  inactiveBoxSize = 3.5,
  activeColor,
  inactiveColor,
}) => {
  const { active, inactive } = useStarRatingColors();
  const finalActiveColor = activeColor ?? active;
  const finalInactiveColor = inactiveColor ?? inactive;

  if (isActive) {
    return <StarIcon boxSize={activeBoxSize} color={finalActiveColor} aria-hidden="true" />;
  }

  return <Icon as={FiStar} boxSize={inactiveBoxSize} color={finalInactiveColor} aria-hidden="true" />;
};


