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
import { ProfileSidebar, RangeButtons, SectionCard, StatTile, HelpList, QuickActionsGrid, PeoplePanel } from "./parts";
import { useProfileEdit, useProfilePeopleQuery, useProfileScreenViewModel, useStatsRangeQuery } from "../model/hooks";
import type { ProfilePeopleMode, StatTileModel } from "../model/types";
import { contributionStatsByRange, progressStatsByRange } from "../model/constants";
import { useProfileScreenUiColors } from "../colors/useProfileScreenUiColors";
import { FiAward, FiBarChart2, FiUsers } from "react-icons/fi";
import { buildContributionTiles, buildProgressTiles, CONTRIBUTION_HINT, contributionHelpList, progressHelpList } from "./data";

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const { items } = useAchievementsData(profile as any);
  const vm = useProfileScreenViewModel({ profile, achievementItems: items });

  const [statsRange] = useStatsRangeQuery({ key: "stats", defaultValue: "week" });
  const [contributionRange] = useStatsRangeQuery({
    key: "contribution",
    defaultValue: "week",
  });

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
    hasTriedSave,
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

  const { mode: peopleMode } = useProfilePeopleQuery();

  const statsPanel = (
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

  const peoplePanelByMode: Record<Exclude<ProfilePeopleMode, "stats">, React.ReactNode> = {
    followers: <PeoplePanel mode="followers" />,
    following: <PeoplePanel mode="following" />,
  };

  const rightColumnByMode: Record<ProfilePeopleMode, React.ReactNode> = {
    stats: statsPanel,
    followers: <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>{peoplePanelByMode.followers}</VStack>,
    following: <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>{peoplePanelByMode.following}</VStack>,
  };

  const rightColumn = rightColumnByMode[peopleMode];

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
              py={{ base: 0, lg: 4 }}
              h={{ base: "auto", lg: "full" }}
            >
              <ProfileSidebar
                avatarUrl={vm.avatarUrl}
                name={vm.name}
                bio={vm.bio}
                xp={vm.xp}
                followersCount={vm.followersCount}
                followingCount={vm.followingCount}
                profileBadge={vm.profileBadge}
                workplace={vm.workplace}
                locationLabel={vm.locationLabel}
                emailValue={vm.emailValue}
                displayLinks={vm.displayLinks}
                isEditing={isEditing}
                editSessionId={editSessionId}
                hasTriedSave={hasTriedSave}
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

          <GridItem minW={0}>{rightColumn}</GridItem>
        </Grid>
      </Box>

    </Box>
  );
};

export default ProfileScreen;


