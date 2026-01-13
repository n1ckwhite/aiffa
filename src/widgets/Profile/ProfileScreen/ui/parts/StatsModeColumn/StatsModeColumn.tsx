"use client";

import React from "react";
import { Box, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { FiAward, FiBarChart2, FiUsers } from "react-icons/fi";
import type { ProfilePeopleMode, StatTileModel } from "../../../model/types";
import { contributionStatsByRange, progressStatsByRange } from "../../../model/constants";
import { useStatsRangeQuery } from "../../../model/hooks";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import { buildContributionTiles, buildProgressTiles, CONTRIBUTION_HINT, contributionHelpList, progressHelpList } from "../../data";
import { buildPeopleUrl } from "../../../model/hooks/useProfilePeopleQuery/helpers";
import { HelpList, QuickActionsGrid, RangeButtons, SectionCard, StatTile } from "..";

export const StatsModeColumn: React.FC = () => {
  const [statsRange] = useStatsRangeQuery({ key: "stats", defaultValue: "week" });
  const [contributionRange] = useStatsRangeQuery({ key: "contribution", defaultValue: "week" });

  const currentStats = progressStatsByRange[statsRange];
  const currentContribution = contributionStatsByRange[contributionRange];

  const progressTiles: StatTileModel[] = buildProgressTiles(currentStats);
  const contributionTiles: StatTileModel[] = buildContributionTiles(currentContribution);

  const {
    muted,
    calloutBorder,
    calloutBg,
    calloutIconBg,
    calloutIconColor,
    calloutTitleColor,
    calloutBodyColor,
  } = useProfileScreenUiColors();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getModeHref = React.useCallback(
    (mode: ProfilePeopleMode) => buildPeopleUrl({ pathname, searchParams, nextMode: mode }),
    [pathname, searchParams],
  );

  return (
    <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
      <SectionCard
        title="Статистика"
        description="Короткий срез по вашему прогрессу и активности."
        icon={FiBarChart2}
        actions={<RangeButtons paramKey="stats" value={statsRange} defaultValue="week" justify="flex-start" />}
      >
        <SimpleGrid minChildWidth={{ base: "100%", sm: "240px", md: "250px" }} spacing={{ base: 3, md: 4 }}>
          {progressTiles.map((t) => (
            <StatTile
              key={t.label}
              label={t.label}
              value={t.value}
              icon={(t as any).icon}
              tooltip={(t as any).tooltip}
              accentColor={(t as any).accentColor}
              emphasis={(t as any).emphasis}
              to={t.mode ? getModeHref(t.mode) : undefined}
            />
          ))}
        </SimpleGrid>

        <HelpList items={progressHelpList} />

        <Box
          mt={{ base: 4, md: 5 }}
          borderWidth="1px"
          borderColor={calloutBorder}
          bg={calloutBg}
          borderRadius="16px"
          px={{ base: 3, md: 4 }}
          py={{ base: 3, md: 3.5 }}
        >
          <HStack spacing={2} align="start">
            <Box
              aria-hidden="true"
              mt="2px"
              w="26px"
              h="26px"
              borderRadius="10px"
              bg={calloutIconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              color={calloutIconColor}
            >
              <Icon as={FiAward} boxSize="14px" />
            </Box>
            <Box>
              <Text fontSize="sm" color={calloutTitleColor} fontWeight="semibold">
                {currentStats.motivationalTop}
              </Text>
              <Text fontSize="sm" color={calloutBodyColor} mt={1}>
                {currentStats.motivationalBottom}
              </Text>
            </Box>
          </HStack>
        </Box>

        <QuickActionsGrid kind="progress" />
      </SectionCard>

      <SectionCard
        title="Вклад в сообщество"
        description="Счётчики собираются из вашего прогресса, задач недели и авторства материалов."
        icon={FiUsers as any}
        actions={
          <RangeButtons
            paramKey="contribution"
            value={contributionRange}
            defaultValue="week"
            justify="flex-start"
          />
        }
      >
        <SimpleGrid minChildWidth={{ base: "100%", sm: "260px", md: "320px" }} spacing={3}>
          {contributionTiles.map((t) => (
            <StatTile
              key={t.label}
              label={t.label}
              value={t.value}
              hint={CONTRIBUTION_HINT}
              icon={(t as any).icon}
              tooltip={(t as any).tooltip}
              accentColor={(t as any).accentColor}
              to={t.mode ? getModeHref(t.mode) : undefined}
            />
          ))}
        </SimpleGrid>

        <VStack align="start" spacing={2} mt={{ base: 3, md: 4 }}>
          <Text fontWeight="semibold" color={muted}>
            Как увеличить вклад
          </Text>
          <HelpList items={contributionHelpList} />
        </VStack>

        <Box
          mt={{ base: 4, md: 5 }}
          borderWidth="1px"
          borderColor={calloutBorder}
          bg={calloutBg}
          borderRadius="16px"
          px={{ base: 3, md: 4 }}
          py={{ base: 3, md: 3.5 }}
        >
          <HStack spacing={2} align="start">
            <Box
              aria-hidden="true"
              mt="2px"
              w="26px"
              h="26px"
              borderRadius="10px"
              bg={calloutIconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              color={calloutIconColor}
            >
              <Icon as={FiAward} boxSize="14px" />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color={calloutTitleColor}>
                Спасибо за вклад в сообщество
              </Text>
              <Text fontSize="sm" color={calloutBodyColor} mt={1}>
                Любое авторство и активность помогают AIFFA становиться лучше для всех.
              </Text>
            </Box>
          </HStack>
        </Box>

        <QuickActionsGrid kind="contribution" />
      </SectionCard>
    </VStack>
  );
};

