import React from "react";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";
import type { BlogHeroFavoritesToggleProps } from "./types";

export const BlogHeroFavoritesToggle: React.FC<BlogHeroFavoritesToggleProps> = ({
  theme,
  isActive,
  onToggle,
  filterButtonBg,
  filterButtonBorder,
  filterButtonHoverBg,
  searchShadow,
  searchHoverShadow,
}) => {
  return (
    <Tooltip
      label={isActive ? "Показаны избранные" : "Показать избранные"}
      hasArrow
      placement="top"
      openDelay={250}
    >
      <IconButton
        aria-label="Показать избранные статьи"
        type="button"
        onClick={onToggle}
        aria-pressed={isActive}
        icon={<Icon as={FiBookmark} aria-hidden="true" boxSize={5} />}
        variant="outline"
        borderWidth="1px"
        borderColor={filterButtonBorder}
        bg={isActive ? filterButtonHoverBg : filterButtonBg}
        borderRadius="full"
        boxSize="45px"
        minW="45px"
        boxShadow={searchShadow}
        transition="background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease"
        _hover={{ bg: filterButtonHoverBg, boxShadow: searchHoverShadow }}
        _active={{ bg: filterButtonHoverBg }}
        _focusVisible={{ boxShadow: "none" }}
        color={theme.titleColor}
      />
    </Tooltip>
  );
};


