import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import type { WatermarkIconProps } from "./types";

export const WatermarkIcon: React.FC<WatermarkIconProps> = ({ icon, color }) => {
  if (!icon) return null;

  return (
    <Box
      aria-hidden="true"
      position="absolute"
      top={{ base: 2, md: 4 }}
      right={{ base: 2, md: 4 }}
      opacity={0.14}
      color={color}
      transform="rotate(-6deg)"
      pointerEvents="none"
      className="stat-tile-watermark"
    >
      <Icon as={icon} boxSize={{ base: "38px", md: "56px" }} />
    </Box>
  );
};


