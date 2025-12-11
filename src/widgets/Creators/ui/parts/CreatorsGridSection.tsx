import React from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUserPlus, FiFilter, FiCheck } from "react-icons/fi";
import FilterBar from "shared/ui/FilterBar";
import { useCreatorsData } from "../hooks/useCreatorsData";
import { useCreatorsFilter } from "../hooks/useCreatorsFilter";
import { usePagination } from "widgets/ModuleProjects/hooks/usePagination";
import { Pagination } from "widgets/ModuleLessons/parts/Pagination";
import CreatorCard from "./CreatorCard";

type TimeRangeValue = "week" | "month" | "year" | "all";

const TIME_RANGE_ITEMS: { value: TimeRangeValue; label: string }[] = [
  { value: "week", label: "За неделю" },
  { value: "month", label: "За месяц" },
  { value: "year", label: "За год" },
  { value: "all", label: "За всё время" },
];

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
  const buttonColor = useColorModeValue("blue.600", "blue.300");
  const [timeRange, setTimeRange] = React.useState<TimeRangeValue>("all");
  const menuBg = useColorModeValue("white", "gray.800");
  const menuBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const menuHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const menuTextColor = useColorModeValue("gray.800", "gray.100");
  const activeMenuBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const activeMenuBorder = useColorModeValue("blue.300", "blue.300");
  const filterIdleBg = useColorModeValue("whiteAlpha.10", "whiteAlpha.50");
  const filterActiveBg = useColorModeValue("rgba(59,130,246,0.16)", "rgba(59,130,246,0.28)");
  const filterIdleBorder = useColorModeValue("whiteAlpha.300", "whiteAlpha.300");
  const filterActiveBorder = useColorModeValue("blue.400", "blue.300");
  const filterIdleIcon = useColorModeValue("gray.400", "gray.400");
  const filterActiveIcon = useColorModeValue("blue.400", "blue.200");
  const isDefaultTimeRange = timeRange === "all";

  return (
    <Box as="section" aria-label="Команда создателей AIFFA">
      <Heading as="h2" size="md" mb={2} letterSpacing="-0.02em" textAlign="center">
        Люди, которые развивают AIFFA.
      </Heading>
      <Text fontSize="sm" color={subtitleColor} textAlign="center" mb={2}>
        Выберите создателей по роли — находите тех, кто делает платформу сильнее.
      </Text>
      <Box textAlign="center" mb={4}>
        <Button
          onClick={() => {
            const target = document.getElementById("creators-contribution");
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          borderRadius="full"
          fontSize="sm"
          fontWeight="semibold"
          px={4}
          py={2}
          bgGradient="linear(to-r, blue.400, blue.500)"
          color="white"
          transition="background 0.2s ease, transform 0.15s ease"
          leftIcon={<FiUserPlus />}
          _hover={{
            bgGradient: "linear(to-r, blue.500, blue.600)",
            transform: "translateY(-1px)",
          }}
          _active={{
            transform: "translateY(0)",
          }}
        >
          Как стать создателем
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        gap={3}
      >
        <Box flex="1" minW={0}>
          <FilterBar
            activeValue={roleFilter}
            items={roleFilters}
            onChange={setRoleFilter}
            ariaLabel="Фильтр по ролям создателей"
          />
        </Box>
        <Box flexShrink={0}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Фильтр по периоду времени"
              icon={<FiFilter />}
              size="sm"
              borderRadius="md"
              variant="outline"
              borderWidth="1px"
              bg={isDefaultTimeRange ? filterIdleBg : filterActiveBg}
              borderColor={isDefaultTimeRange ? filterIdleBorder : filterActiveBorder}
              color={isDefaultTimeRange ? filterIdleIcon : filterActiveIcon}
              w={9}
              h={9}
              _hover={{
                bg: isDefaultTimeRange ? filterIdleBg : filterActiveBg,
                borderColor: filterActiveBorder,
                color: filterActiveIcon,
              }}
              _active={{
                bg: filterActiveBg,
              }}
            />
            <MenuList
              bg={menuBg}
              borderColor={menuBorder}
              py={0}
              minW="180px"
            >
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
                  {item.value === timeRange && (
                    <FiCheck
                      aria-hidden="true"
                      size={16}
                      style={{ marginLeft: 8, color: "#22c55e" }}
                    />
                  )}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Box>
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


