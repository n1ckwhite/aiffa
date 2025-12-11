import React from "react";
import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import HorizontalScroll from "shared/ui/HorizontalScroll";

export type FilterBarItem<T extends string = string> = {
  value: T;
  label: string;
};

export type FilterBarProps<T extends string = string> = {
  activeValue: T;
  items: FilterBarItem<T>[];
  onChange: (value: T) => void;
  ariaLabel?: string;
};

const FilterBar = <T extends string = string>({
  activeValue,
  items,
  onChange,
  ariaLabel = "Фильтр",
}: FilterBarProps<T>) => {
  const activeBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const activeBorder = useColorModeValue("blue.500", "blue.300");
  const activeColor = useColorModeValue("blue.700", "blue.200");

  const idleBg = useColorModeValue("white", "whiteAlpha.50");
  const idleBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const idleColor = useColorModeValue("gray.700", "gray.100");
  const idleHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const idleHoverBorder = useColorModeValue("blue.200", "blue.300");

  const handleKeyDown = (value: T) => (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(value);
    }
  };

  return (
    <HorizontalScroll mb={4}>
      <HStack
        as="ul"
        spacing={2}
        minW="max-content"
        align="stretch"
        px={0.5}
        role="tablist"
        aria-label={ariaLabel}
      >
        {items.map((item) => {
          const isActive = item.value === activeValue;

          return (
            <Box
              as="button"
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              mt={1}
              aria-pressed={isActive}
              tabIndex={0}
              onClick={() => onChange(item.value)}
              onKeyDown={handleKeyDown(item.value)}
              px={4}
              py={1.5}
              borderRadius="full"
              borderWidth="1px"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="-0.01em"
              whiteSpace="nowrap"
              bg={isActive ? activeBg : idleBg}
              borderColor={isActive ? activeBorder : idleBorder}
              color={isActive ? activeColor : idleColor}
              boxShadow="none"
              transition="background-color 0.16s ease-out, border-color 0.16s ease-out, color 0.16s ease-out, transform 0.08s ease-out"
              _hover={{
                bg: isActive ? activeBg : idleHoverBg,
                borderColor: isActive ? activeBorder : idleHoverBorder,
                transform: "translateY(-1px)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </HStack>
    </HorizontalScroll>
  );
};

export default FilterBar;


