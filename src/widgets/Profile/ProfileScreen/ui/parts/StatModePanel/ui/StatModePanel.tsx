"use client";

import React from "react";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { AppButtonLink } from "shared/ui/AppLink";
import { useProfileScreenUiColors } from "../../../../colors/useProfileScreenUiColors";
import { SectionCard } from "../../SectionCard";
import { PaginationNav } from "../../PaginationNav";
import type { StatModePanelProps } from "../model";
import { usePanelPagination } from "../model";
import { MaterialCardItem, PlainListItem, WeeklyCardItem } from "./parts";

export const StatModePanel: React.FC<StatModePanelProps> = ({ title, description, icon, items, pagination, actions }) => {
  const { peoplePanelGhostHoverBg, peoplePanelGhostActiveBg, cardBorder, muted } = useProfileScreenUiColors();
  const listDomId = React.useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { pageItems, totalPages, page, prevHref, nextHref, isPrevDisabled, isNextDisabled, ariaLabel } = usePanelPagination({
    items,
    pagination,
    pathname,
    searchParams,
  });

  const hasItems = pageItems.length > 0;

  return (
    <SectionCard
      title={title}
      description={description}
      icon={icon as any}
      actions={
        actions ?? (
        <AppButtonLink
          to="/profile"
          prefetch={false}
          variant="ghost"
          leftIcon={<Icon as={FiArrowLeft} />}
          aria-label="Вернуться в профиль"
          h="40px"
          borderRadius="full"
          _hover={{ bg: peoplePanelGhostHoverBg }}
          _active={{ bg: peoplePanelGhostActiveBg }}
        >
          Назад
        </AppButtonLink>
        )
      }
    >
      <VStack align="stretch" spacing={3} minW={0}>
        {hasItems ? (
          <Box as="ul" listStyleType="none" m={0} p={0} display="grid" gap={3}>
            {pageItems.map((it, idx) => {
              const absoluteIdx = (page - 1) * (pagination?.pageSize ?? items.length) + idx;
              const titleDomId = `${listDomId}-item-${absoluteIdx}-title`;

              if (it.cardVariant === "weekly") {
                return <WeeklyCardItem key={`${titleDomId}-${it.title}`} item={it} titleDomId={titleDomId} mutedColor={muted} />;
              }

              if (it.cardVariant === "material") {
                return (
                  <MaterialCardItem
                    key={`${titleDomId}-${it.title}`}
                    item={it}
                  />
                );
              }

              return (
                <PlainListItem
                  key={`${titleDomId}-${it.title}`}
                  item={it}
                  titleDomId={titleDomId}
                  cardBorder={cardBorder}
                  mutedColor={muted}
                />
              );
            })}
          </Box>
        ) : (
          <Text fontSize="sm" color={muted}>
            Пока здесь пусто.
          </Text>
        )}

        {pagination && totalPages > 1 ? (
          <PaginationNav
            ariaLabel={ariaLabel ?? "Пагинация"}
            prevHref={prevHref}
            nextHref={nextHref}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
          />
        ) : null}
      </VStack>
    </SectionCard>
  );
};

