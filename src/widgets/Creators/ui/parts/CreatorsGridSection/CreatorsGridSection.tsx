import React from "react";
import { Box, Button, Heading, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiCheck, FiFilter, FiUserPlus } from "react-icons/fi";
import FilterBar from "shared/ui/FilterBar";
import { Pagination } from "shared/ui/Pagination";
import { usePagination } from "widgets/ModuleProjects/hooks/usePagination";
import { useCreatorsData } from "../../hooks/useCreatorsData";
import { useCreatorsFilter } from "../../hooks/useCreatorsFilter";
import CreatorCard from "../CreatorCard";
import { useCreatorsGridColors } from "./colors/useCreatorsGridColors";
import { TIME_RANGE_ITEMS } from "./data/timeRange";
import { useTimeRange } from "./helpers/useTimeRange";
import { Creator } from "@/widgets/Creators/model/types";

const CreatorsGridSection: React.FC = () => {
  const { items } = useCreatorsData();
  const { roleFilter, setRoleFilter, filteredItems, roleFilters } = useCreatorsFilter(items);
  const pageSize = 6;
  const { page, setPage, totalPages, start, end, canPrev, canNext, pageItems } = usePagination(filteredItems.length, pageSize);
  const pagedItems = filteredItems.slice(start, end);

  const {
    subtitleColor,
    menuBg,
    menuBorder,
    menuHoverBg,
    menuTextColor,
    activeMenuBg,
    activeMenuBorder,
    filterIdleBg,
    filterActiveBg,
    filterIdleBorder,
    filterActiveBorder,
    filterIdleIcon,
    filterActiveIcon,
    filterHoverBg,
    filterHoverBorder,
    badgeBg,
    badgeBorder,
    badgeIconColor,
    paginationColors,
  } = useCreatorsGridColors();

  const { timeRange, setTimeRange, TimeRangeBadgeIcon, isDefaultTimeRange } = useTimeRange();

  return (
    <VStack align="stretch" spacing={5} as="section" aria-label="Команда создателей AIFFA">
      <Heading as="h2" size="md" letterSpacing="-0.02em">
        Люди, которые развивают AIFFA.
      </Heading>
      <Text fontSize="sm" color={subtitleColor}>
        Выберите создателей по роли — находите тех, кто делает платформу сильнее.
      </Text>
      <Box textAlign="center">
        <Button
          borderRadius="full"
          fontSize="sm"
          fontWeight="semibold"
          px={4}
          py={2}
          bgGradient="linear(to-r, blue.400, blue.500)"
          color="white"
          transition="background 0.2s ease"
          leftIcon={<FiUserPlus />}
          _hover={{
            bgGradient: "linear(to-r, blue.500, blue.600)",
          }}
          _active={{}}
        >
          Как стать создателем
        </Button>
      </Box>
      <Box display="flex" alignItems="start" justifyContent="space-between" gap={3}>
        <Box flex="1" minW={0}>
          <FilterBar activeValue={roleFilter} items={roleFilters} onChange={setRoleFilter} ariaLabel="Фильтр по ролям создателей" />
        </Box>
        <Box flexShrink={0} position="relative">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Фильтр по периоду времени"
              icon={<FiFilter />}
              size="sm"
              borderRadius="full"
              variant="outline"
              borderWidth="1px"
              bg={isDefaultTimeRange ? filterIdleBg : filterActiveBg}
              borderColor={isDefaultTimeRange ? filterIdleBorder : filterActiveBorder}
              color={isDefaultTimeRange ? filterIdleIcon : filterActiveIcon}
              w={9}
              h={9}
              _hover={{
                bg: isDefaultTimeRange ? filterHoverBg : filterActiveBg,
                borderColor: isDefaultTimeRange ? filterHoverBorder : filterActiveBorder,
                color: filterActiveIcon,
              }}
              _active={{
                bg: filterActiveBg,
              }}
            />
            <MenuList bg={menuBg} borderColor={menuBorder} py={0} minW="180px">
              {TIME_RANGE_ITEMS.map((item) => (
                <MenuItem
                  key={item.value}
                  onClick={() => setTimeRange(item.value)}
                  fontSize="sm"
                  color={menuTextColor}
                  borderRadius="md"
                  mt={0.5}
                  mb={0.5}
                  px={3}
                  py={2}
                  bg={item.value === timeRange ? activeMenuBg : "transparent"}
                  borderWidth={item.value === timeRange ? "1px" : "0"}
                  borderColor={item.value === timeRange ? activeMenuBorder : "transparent"}
                  _hover={{
                    bg: item.value === timeRange ? activeMenuBg : menuHoverBg,
                  }}
                  fontWeight={item.value === timeRange ? "semibold" : "normal"}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {item.label}
                  {item.value === timeRange && <FiCheck aria-hidden="true" size={16} style={{ marginLeft: 8, color: "#22c55e" }} />}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Box
            position="absolute"
            top={-1.5}
            right={-1.5}
            w={5}
            h={5}
            borderRadius="full"
            bg={badgeBg}
            borderWidth="1px"
            borderColor={badgeBorder}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={TimeRangeBadgeIcon} boxSize={3} aria-hidden="true" color={badgeIconColor} />
          </Box>
        </Box>
      </Box>
      <SimpleGrid mt={3} columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
        {pagedItems.map((creator: Creator, index: number) => (
          <CreatorCard key={creator.id} creator={creator} index={start + index + 1} />
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
            colors={paginationColors}
          />
        </Box>
      )}
    </VStack>
  );
};

export default CreatorsGridSection;


