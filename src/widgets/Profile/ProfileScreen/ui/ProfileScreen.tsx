import React from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  SimpleGrid, 
  Text, 
  VStack,
} from "@chakra-ui/react";
import { useUserProfile } from "entities/user";
import { useAchievementsData } from "../hooks/useAchievementsData";
import { ProfileSidebar, RangeButtons, SectionCard, StatTile, HelpList, QuickActionsGrid } from "./parts";
import { useProfileEdit, useProfileScreenViewModel } from "../model/hooks";
import type { StatTileModel, StatsRange } from "../model/types";
import { contributionStatsByRange, progressStatsByRange } from "../model/constants";
import { useProfileScreenUiColors } from "../colors/useProfileScreenUiColors";
import { FiAward, FiBarChart2, FiUsers } from "react-icons/fi";
import { buildContributionTiles, buildProgressTiles, CONTRIBUTION_HINT, contributionHelpList, progressHelpList } from "./data";

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const { items } = useAchievementsData(profile as any);
  const vm = useProfileScreenViewModel({ profile, achievementItems: items });

  // NOTE: По просьбе — без вычислений через хуки. Ставим цифры напрямую (по диапазонам тоже — хардкод).
  // Each block owns its own range (do NOT sync).
  const [statsRange, setStatsRange] = React.useState<StatsRange>("week");
  const [contributionRange, setContributionRange] = React.useState<StatsRange>("week");

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

  const {
    isEditing,
    editSessionId,
    editInitial,
    isSaving,
    saveState,
    saveAction,
    handleStartEdit,
    handleCancelEdit,
    handleStopHotkeys,
  } = useProfileEdit({
    profile,
    displayLinks: vm.displayLinks,
    emailValue: vm.emailValue,
    updateProfile,
  });


  return (
    <Box
      as="main"
      role="main"
      position="relative"
      overflow="hidden"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
      aria-labelledby="profile-page-title"
    >
      <Box maxW={{ base: "100%", md: "1000px", lg: "1180px" }} mx="auto">
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(320px, 420px) 1fr" }}
          gap={{ base: 4, md: 6 }}
          alignItems={{ base: "start", lg: "stretch" }}
        >
          <GridItem>
            <Box
              px={{base: 0, lg: 4}}
              py={{base: 0, lg: 4}}
              h={{ base: "auto", lg: "full" }}
            >
            <ProfileSidebar
              avatarUrl={vm.avatarUrl}
              name={vm.name}
              bio={vm.bio}
              xp={vm.xp}
              profileBadge={vm.profileBadge}
              workplace={vm.workplace}
              locationLabel={vm.locationLabel}
              emailValue={vm.emailValue}
              displayLinks={vm.displayLinks}
              isEditing={isEditing}
              editSessionId={editSessionId}
              editInitial={editInitial}
              saveAction={saveAction}
              isSaving={isSaving}
              handleStartEdit={handleStartEdit}
              handleCancelEdit={handleCancelEdit}
              handleStopHotkeys={handleStopHotkeys}
              achievedItems={vm.achievedItems}
            />
            </Box>
          </GridItem>

          <GridItem minW={0}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
            <SectionCard
              title="Статистика"
              description="Короткий срез по вашему прогрессу и активности."
              icon={FiBarChart2 as any}
              actions={
                <RangeButtons
                  value={statsRange}
                  onChange={setStatsRange}
                  justify="flex-start"
                />
              }
            >
              {/* Prefer 3 columns on desktop, but never "squeeze" tiles on narrower widths */}
              <SimpleGrid
                // Important: breakpoints depend on viewport width, but this grid can be narrow inside the layout.
                // Use a larger minChildWidth on `sm` to avoid "squeezing" when container is ~400px wide.
                minChildWidth={{ base: "100%", sm: "240px", md: "250px" }}
                spacing={{ base: 3, md: 4 }}
              >
                {progressTiles.map((t) => (
                  <StatTile
                    key={t.label}
                    label={t.label}
                    value={t.value}
                    icon={(t as any).icon}
                    tooltip={(t as any).tooltip}
                    accentColor={(t as any).accentColor}
                    emphasis={(t as any).emphasis}
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
                  value={contributionRange}
                  onChange={setContributionRange}
                  justify="flex-end"
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
          </GridItem>
        </Grid>
      </Box>

    </Box>
  );
};

export default ProfileScreen;


