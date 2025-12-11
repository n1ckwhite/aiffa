import React from "react";
import { Box, Heading, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import FilterBar from "shared/ui/FilterBar";
import { useCreatorsData } from "../hooks/useCreatorsData";
import { useCreatorsFilter } from "../hooks/useCreatorsFilter";
import { usePagination } from "widgets/ModuleProjects/hooks/usePagination";
import { Pagination } from "widgets/ModuleLessons/parts/Pagination";
import CreatorCard from "./CreatorCard";

const CreatorsGridSection: React.FC = () => {
  const { items } = useCreatorsData();
  const {
    roleFilter,
    setRoleFilter,
    filteredItems,
    roleFilters,
  } = useCreatorsFilter(items);
  const pageSize = 6;
  const { page, setPage, totalPages, start, end, canPrev, canNext, pageItems } = usePagination(
    filteredItems.length,
    pageSize,
  );
  const pagedItems = filteredItems.slice(start, end);
  const subtitleColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box as="section" aria-label="Команда создателей AIFFA">
      <Heading as="h2" size="md" mb={2} letterSpacing="-0.02em" textAlign="center">
        Команда создателей
      </Heading>
      <Text fontSize="sm" color={subtitleColor} textAlign="center" mb={4}>
        Рассмотрите создателей в разных ролях — выберите тех, с кем вам по пути в развитии AIFFA.
      </Text>
      <VStack align="stretch" spacing={2} mb={1}>
        <FilterBar
          activeValue={roleFilter}
          items={roleFilters}
          onChange={setRoleFilter}
          ariaLabel="Фильтр по ролям создателей"
        />
      </VStack>
      <SimpleGrid
        mt={3}
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 4, md: 5 }}
        alignItems="stretch"
      >
        {pagedItems.map((creator, index) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            index={start + index + 1}
          />
        ))}
      </SimpleGrid>
      {totalPages > 1 && (
        <Box mt={4}>
          <Pagination
            pageItems={pageItems}
            page={page}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => setPage(Math.max(1, page - 1))}
            onNext={() => setPage(Math.min(totalPages, page + 1))}
            onSelect={(next) => setPage(next)}
            colors={{
              controlsBg: useColorModeValue("white", "gray.800"),
              controlsBorder: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
              controlsHoverBg: useColorModeValue("blackAlpha.50", "whiteAlpha.200"),
              controlsIcon: useColorModeValue("gray.700", "gray.200"),
              descColor: useColorModeValue("gray.500", "gray.400"),
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CreatorsGridSection;


