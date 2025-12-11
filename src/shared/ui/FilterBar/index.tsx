import React from "react";
import { Box, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import HorizontalScroll from "shared/ui/HorizontalScroll";

export type FilterBarItem<T extends string = string> = {
  value: T;
  label: string;
  icon?: IconType;
  accentColor?: string;
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
  const activeBg = useColorModeValue(
    "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(129,140,248,0.14))",
    "linear-gradient(135deg, rgba(148,163,184,0.18), rgba(59,130,246,0.32))",
  );
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
        justify="center"
        px={0.5}
        mx="auto"
        role="tablist"
        aria-label={ariaLabel}
      >
        {items.map((item) => {
          const isActive = item.value === activeValue;
          const accent = item.accentColor ?? activeColor;
          const iconActiveColor = accent;
          const iconIdleColor = useColorModeValue("gray.400", "gray.500");
          const labelColor = isActive ? useColorModeValue("gray.900", "gray.100") : idleColor;

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
              color={labelColor}
              boxShadow={isActive ? "0 4px 10px rgba(15,23,42,0.12)" : "none"}
              transition="background-color 0.16s ease-out, border-color 0.16s ease-out, color 0.16s ease-out, box-shadow 0.18s ease-out, transform 0.08s ease-out"
              _hover={{
                bg: isActive ? activeBg : idleHoverBg,
                borderColor: isActive ? activeBorder : idleHoverBorder,
                transform: "translateY(-1px)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
            >
              <HStack as="span" spacing={1} align="center">
                {item.icon && (
                  <Icon
                    as={item.icon}
                    boxSize={3}
                    aria-hidden="true"
                    color={isActive ? iconActiveColor : iconIdleColor}
                  />
                )}
                <Text as="span">{item.label}</Text>
              </HStack>
            </Box>
          );
        })}
      </HStack>
    </HorizontalScroll>
  );
};

export default FilterBar;


