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
import { useStatModePanel } from "../model";
import { RenderStatModePanelItem } from "./renderers/RenderStatModePanelItem";

export const StatModePanel: React.FC<StatModePanelProps> = ({ title, description, icon, items, pagination, actions }) => {
  const { peoplePanelGhostHoverBg, peoplePanelGhostActiveBg, cardBorder, muted } = useProfileScreenUiColors();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { vmItems, hasItems, paginationVm } = useStatModePanel({
    items,
    pagination,
    pathname,
    searchParams,
  });
  const isArticlesGrid = vmItems.some((vm) => vm.item.cardVariant === "article");

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
          <Box
            as="ul"
            listStyleType="none"
            m={0}
            p={0}
            display="grid"
            gap={{ base: 4, md: 5 }}
            gridTemplateColumns={isArticlesGrid ? { base: "1fr", md: "repeat(2, minmax(0, 1fr))" } : "1fr"}
          >
            {vmItems.map((vm) => (
              <RenderStatModePanelItem
                key={vm.key}
                item={vm.item}
                titleDomId={vm.titleDomId}
                mutedColor={muted}
                cardBorder={cardBorder}
                listIndex={vm.listIndex}
              />
            ))}
          </Box>
        ) : (
          <Text fontSize="sm" color={muted}>
            Пока здесь пусто.
          </Text>
        )}

        {paginationVm ? (
          <PaginationNav
            ariaLabel={paginationVm.ariaLabel}
            prevHref={paginationVm.prevHref}
            nextHref={paginationVm.nextHref}
            isPrevDisabled={paginationVm.isPrevDisabled}
            isNextDisabled={paginationVm.isNextDisabled}
          />
        ) : null}
      </VStack>
    </SectionCard>
  );
};

