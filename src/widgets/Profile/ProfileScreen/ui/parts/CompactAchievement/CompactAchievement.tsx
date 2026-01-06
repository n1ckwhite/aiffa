import React from "react";
import { Box, Tooltip, useColorModeValue } from "@chakra-ui/react";
import type { CompactAchievementProps } from "./types";

export const CompactAchievement: React.FC<CompactAchievementProps> = ({ item }) => {
  const ring = `conic-gradient(${item.from} 0 50%, ${item.to} 50% 100%)`;
  const bg = useColorModeValue("white", "gray.900");
  const label = String(item?.label ?? "Достижение");

  return (
    <Tooltip hasArrow openDelay={220} placement="top" label={label}>
      <Box
        as="button"
        type="button"
        aria-label={label}
        tabIndex={0}
        h="44px"
        w="44px"
        borderRadius="full"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="transform 160ms ease"
        _hover={{ transform: "translateY(-1px)" }}
      >
        <Box position="absolute" inset={0} borderRadius="full" bg={ring} />
        <Box position="absolute" inset="4px" borderRadius="full" bg={bg} borderWidth="1px" borderColor={item.color} />
        <Box
          position="relative"
          w="24px"
          h="24px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgGradient={`linear(to-br, ${item.from}, ${item.to})`}
          color="white"
          fontSize="14px"
        >
          {item?.icon ? React.createElement(item.icon) : null}
        </Box>
      </Box>
    </Tooltip>
  );
};


