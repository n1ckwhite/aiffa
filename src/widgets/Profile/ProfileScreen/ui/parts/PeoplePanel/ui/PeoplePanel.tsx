import React from "react";
import { HStack, Icon, VStack } from "@chakra-ui/react";
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";
import { AppButtonLink } from "shared/ui/AppLink";
import { useProfileScreenUiColors } from "../../../../colors/useProfileScreenUiColors";
import { SectionCard } from "../../SectionCard";
import type { PeoplePanelMode, PeoplePanelProps } from "../types";
import { PeopleEmptyState } from "./parts/PeopleEmptyState";
import { PeopleList } from "./parts/PeopleList";
import { peopleMockByMode } from "../data/peopleMockByMode";
import { copyByMode } from "../data/copyByMode";
import { usePeopleFollowState, usePeoplePagination } from "../model/hooks";

export const PeoplePanel: React.FC<PeoplePanelProps> = ({ mode }) => {
  const {
    peoplePanelGhostHoverBg,
    peoplePanelGhostActiveBg,
    primaryBtnBg,
    primaryBtnHoverBg,
    primaryBtnActiveBg,
    linkTextColor,
    cardBorder,
  } = useProfileScreenUiColors();
  const copy = copyByMode[mode as PeoplePanelMode];

  const items = peopleMockByMode[mode];

  const { pageItems, shouldShowPagination, isPrevDisabled, isNextDisabled, prevHref, nextHref } = usePeoplePagination(
    items,
  );
  const { isFollowingById, onToggleFollowById } = usePeopleFollowState(items);

  const hasItems = items.length > 0;

  const paginationByShouldShow: Record<number, React.ReactNode> = {
    0: null,
    1: (
      <HStack justify="center" spacing={3} pt={1}>
        <AppButtonLink
          to={prevHref}
          prefetch={false}
          scroll={false}
          replace
          isDisabled={isPrevDisabled}
          aria-label="Предыдущая страница"
          size="sm"
          variant="outline"
          color={linkTextColor}
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
          scroll={false}
          replace
          isDisabled={isNextDisabled}
          aria-label="Следующая страница"
          size="sm"
          variant="outline"
          color={linkTextColor}
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
    ),
  };

  const showPaginationKey = Number(shouldShowPagination);

  const contentByHasItems: Record<"items" | "empty", React.ReactNode> = {
    items: (
      <VStack align="stretch" spacing={3}>
        <PeopleList items={pageItems} isFollowingById={isFollowingById} onToggleFollowById={onToggleFollowById} />
        {paginationByShouldShow[showPaginationKey]}
      </VStack>
    ),
    empty: (
      <PeopleEmptyState title={copy.emptyTitle} description={copy.emptyDescription}>
        <AppButtonLink
          to={copy.ctaHref}
          aria-label={copy.ctaLabel}
          bg={primaryBtnBg}
          color="white"
          h="40px"
          px={4}
          borderRadius="md"
          fontWeight="semibold"
          _hover={{ bg: primaryBtnHoverBg, transform: "translateY(-1px)", boxShadow: "md" }}
          _active={{ bg: primaryBtnActiveBg, transform: "translateY(0px)", boxShadow: "sm" }}
          transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
          w="fit-content"
        >
          {copy.ctaLabel}
        </AppButtonLink>
      </PeopleEmptyState>
    ),
  };

  let contentMode: "items" | "empty" = "empty";
  if (hasItems) contentMode = "items";

  return (
    <SectionCard
      title={copy.title}
      description={copy.description}
      icon={FiUsers as any}
      actions={
        <AppButtonLink
          to="/profile"
          variant="ghost"
          leftIcon={<Icon as={FiArrowLeft} />}
          aria-label="Вернуться в профиль"
          h="40px"
          borderRadius="md"
          _hover={{ bg: peoplePanelGhostHoverBg }}
          _active={{ bg: peoplePanelGhostActiveBg }}
        >
          Назад
        </AppButtonLink>
      }
    >
      <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
        {contentByHasItems[contentMode]}
      </VStack>
    </SectionCard>
  );
};


