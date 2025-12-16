import React from "react";
import { Box } from "@chakra-ui/react";
import type { PaginationDotsProps } from "../types";

export const PaginationDots: React.FC<PaginationDotsProps> = ({ value, colors }) => {
  return (
    <Box as="span" px={1} color={colors.descColor} userSelect="none" flexShrink={0}>
      {value}
    </Box>
  );
};


