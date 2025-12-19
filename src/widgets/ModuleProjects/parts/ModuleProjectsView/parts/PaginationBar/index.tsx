import React from "react";
import { Box } from "@chakra-ui/react";
import { Pagination } from "shared/ui/Pagination";
import { PaginationBarProps } from "./types";

export const PaginationBar: React.FC<PaginationBarProps> = ({ pageItems, page, canPrev, canNext, getPageHref, colors }) => {
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
        colors={colors as any}
      />
    </Box>
  );
};


