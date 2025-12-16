import React from "react";
import { Box } from "@chakra-ui/react";
import { Pagination } from "shared/ui/Pagination";
import type { PaginationBarProps } from './types';

export const PaginationBar: React.FC<PaginationBarProps> = ({ page, setPage, canPrev, canNext, totalPages, pageItems, colors }) => {
  if (totalPages <= 1) return null;
  return (
    <Box alignSelf="center" w="fit-content" maxW="100%">
      <Pagination
        pageItems={pageItems}
        page={page}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={() => {
          if (!canPrev) return;
          setPage((p: number) => Math.max(1, p - 1));
        }}
        onNext={() => {
          if (!canNext) return;
          setPage((p: number) => Math.min(totalPages, p + 1));
        }}
        onSelect={(p) => setPage(p)}
        colors={colors}
      />
    </Box>
  );
};


