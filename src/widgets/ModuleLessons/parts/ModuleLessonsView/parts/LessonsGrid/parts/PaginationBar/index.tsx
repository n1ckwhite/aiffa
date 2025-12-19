import React from "react";
import { Box } from "@chakra-ui/react";
import { Pagination } from "shared/ui/Pagination";
import type { PaginationBarProps } from './types';

export const PaginationBar: React.FC<PaginationBarProps> = ({ page, canPrev, canNext, totalPages, pageItems, getPageHref, colors }) => {
  if (totalPages <= 1) return null;
  return (
    <Box w="full" maxW="100%">
      <Pagination
        pageItems={pageItems}
        page={page}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={() => {}}
        onNext={() => {}}
        onSelect={() => {}}
        getPageHref={getPageHref}
        colors={colors}
      />
    </Box>
  );
};


