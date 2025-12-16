import React from "react";
import { Box } from "@chakra-ui/react";
import { Pagination } from "shared/ui/Pagination";
import { PaginationBarProps } from "./types";

export const PaginationBar: React.FC<PaginationBarProps> = ({ pageItems, page, canPrev, canNext, onPrev, onNext, onSelect, colors }) => {
  return (
    <Box alignSelf="center" w="fit-content" maxW="100%">
      <Pagination
        pageItems={pageItems}
        page={page}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={onPrev}
        onNext={onNext}
        onSelect={onSelect}
        colors={colors as any}
      />
    </Box>
  );
};


