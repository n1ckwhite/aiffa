"use client";

import React from "react";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { FiArrowLeft, FiStar } from "react-icons/fi";
import { AppButtonLink } from "shared/ui/AppLink";
import { useProfileScreenUiColors } from "../../../../colors/useProfileScreenUiColors";
import { SectionCard } from "../../SectionCard";
import AchievementsGrid from "widgets/AchievementsGrid";
import type { AchievementItem } from "widgets/AchievementsGrid";

export type AchievementsPanelProps = {
  items: readonly AchievementItem[];
};

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ items }) => {
  const { peoplePanelGhostHoverBg, peoplePanelGhostActiveBg, muted } = useProfileScreenUiColors();
  const achievedItems = React.useMemo(() => items.filter((i) => Boolean(i?.achieved)), [items]);
  const hasItems = achievedItems.length > 0;

  return (
    <SectionCard
      title="Достижения"
      description="Собирайте значки за активность: решайте задачи, держите серии, изучайте материалы и делитесь обратной связью."
      icon={FiStar as any}
      actions={
        <AppButtonLink
          to="/profile"
          prefetch={false}
          scroll={false}
          replace
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
      <VStack align="stretch" spacing={{ base: 3, md: 4 }} minW={0}>
        <Box position="relative" w="full" minW={0}>
          {hasItems ? (
            <AchievementsGrid items={achievedItems as any} showHeader={false} />
          ) : (
            <Text color={muted} fontSize="sm">
              Пока нет полученных достижений.
            </Text>
          )}
        </Box>
      </VStack>
    </SectionCard>
  );
};

