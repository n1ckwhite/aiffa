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
  const getVariantKey = (it: (typeof pageItems)[number]) => (it as any).cardVariant ?? "plain";

  const renderByVariant = {
    weekly: (it: (typeof pageItems)[number], key: string, titleDomId: string) => (
      <WeeklyCardItem key={key} item={it as any} titleDomId={titleDomId} mutedColor={muted} />
    ),
    material: (it: (typeof pageItems)[number], key: string) => <MaterialCardItem key={key} item={it as any} />,
    plain: (it: (typeof pageItems)[number], key: string, titleDomId: string) => (
      <PlainListItem key={key} item={it as any} titleDomId={titleDomId} cardBorder={cardBorder} mutedColor={muted} />
    ),
  } as const satisfies Record<string, (...args: any[]) => React.ReactNode>;

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
              const key = `${titleDomId}-${it.title}`;

              const variant = getVariantKey(it);
              const renderer = (renderByVariant as any)[variant] ?? renderByVariant.plain;
              return renderer(it, key, titleDomId);
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

