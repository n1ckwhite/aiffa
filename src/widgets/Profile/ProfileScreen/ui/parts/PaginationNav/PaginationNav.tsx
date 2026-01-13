import React from "react";
import { HStack, Icon } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AppButtonLink } from "shared/ui/AppLink";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import { PaginationNavProps } from "./types";

export const PaginationNav: React.FC<PaginationNavProps> = ({
  ariaLabel,
  prevHref,
  nextHref,
  isPrevDisabled,
  isNextDisabled,
  tone = "muted",
}) => {
  const { peoplePanelGhostHoverBg, peoplePanelGhostActiveBg, cardBorder, muted, linkTextColor } =
    useProfileScreenUiColors();

  const currentColor = tone === "link" ? linkTextColor : muted;

  return (
    <HStack as="nav" aria-label={ariaLabel ?? "Пагинация"} justify="center" spacing={3} pt={1}>
      <AppButtonLink
        to={prevHref}
        prefetch={false}
        isDisabled={isPrevDisabled}
        aria-label="Предыдущая страница"
        size="sm"
        variant="outline"
        color={currentColor}
        borderColor={cardBorder}
        _hover={{ bg: peoplePanelGhostHoverBg }}
        _active={{ bg: peoplePanelGhostActiveBg }}
        minW="32px"
        w="32px"
        h="32px"
        px={0}
      >
        <Icon as={FiChevronLeft} />
      </AppButtonLink>

      <AppButtonLink
        to={nextHref}
        prefetch={false}
        isDisabled={isNextDisabled}
        aria-label="Следующая страница"
        size="sm"
        variant="outline"
        color={currentColor}
        borderColor={cardBorder}
        _hover={{ bg: peoplePanelGhostHoverBg }}
        _active={{ bg: peoplePanelGhostActiveBg }}
        minW="32px"
        w="32px"
        h="32px"
        px={0}
      >
        <Icon as={FiChevronRight} />
      </AppButtonLink>
    </HStack>
  );
};

