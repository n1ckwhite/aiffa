import React from "react";
import { Box, HStack, Icon } from "@chakra-ui/react";
import type { LeftRowProps } from "./types";

export const LeftRow: React.FC<LeftRowProps> = ({ icon, iconColor, spacing = 3, children }) => {
  return (
    <HStack spacing={spacing} align="center" w="full" minW={0}>
      <Box
        aria-hidden="true"
        w="22px"
        h="22px"
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={iconColor}
      >
        <Icon as={icon} boxSize="18px" />
      </Box>
      <Box minW={0} flex={1}>
        {children}
      </Box>
    </HStack>
  );
};


