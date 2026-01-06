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
import { useUserProfile, type ProfileLink } from "entities/user";
import { useAchievementsData } from "../hooks/useAchievementsData";
import { ProfileSidebar, RangeButtons, SectionCard, StatTile, HelpList, QuickActionsGrid } from "./parts";
import { useProfileEdit } from "../model/hooks";
import type { StatTileModel, StatsRange } from "../model/types";
import { contributionStatsByRange, DEFAULT_PROFILE_EMAIL, PLACEHOLDER_AVATAR_URL, progressStatsByRange } from "../model/constants";
import { useProfileScreenUiColors } from "../colors/useProfileScreenUiColors";
import { FiAward, FiBarChart2, FiUsers } from "react-icons/fi";
import { buildContributionTiles, buildProgressTiles, CONTRIBUTION_HINT, contributionHelpList, progressHelpList } from "./data";

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const profileAny = profile as any;
  let name = "";
  if (typeof (profile as any)?.name === "string") name = (profile as any).name;

  let bio = "";
  if (typeof (profile as any)?.bio === "string") bio = (profile as any).bio;

  let avatarUrl = PLACEHOLDER_AVATAR_URL;
  if (typeof profileAny?.avatarUrl === "string") {
    const trimmed = profileAny.avatarUrl.trim();
    if (trimmed) avatarUrl = trimmed;
  }

  const { items } = useAchievementsData(profile as any);

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

  let xp = 0;
  if (typeof profileAny.xp === "number" && Number.isFinite(profileAny.xp) && profileAny.xp >= 0) {
    xp = Math.trunc(profileAny.xp);
  }

  let rawLinks: any[] = [];
  if (Array.isArray(profileAny.links)) rawLinks = profileAny.links as any[];
  const profileLinks: ProfileLink[] = rawLinks
    .filter(Boolean)
    .map((l: any) => {
      const id = String(l?.id ?? "");
      let kind = "custom";
      if (l?.kind === "email" || l?.kind === "website" || l?.kind === "custom") kind = l.kind;

      let label = "";
      if (typeof l?.label === "string") label = l.label;

      let value = "";
      if (typeof l?.value === "string") value = l.value;

      return { id, kind, label, value } as ProfileLink;
    })
    .filter((l: any) => !!l.id && !!String(l.value || "").trim()) as ProfileLink[];

  const displayLinks: ProfileLink[] = profileLinks;

  let profileBadge: { label: string; colorScheme: string } = { label: "Автор AIFFA", colorScheme: "blue" };
  if (displayLinks.length > 0) {
    profileBadge = { label: "Контрибьютор", colorScheme: "purple" };
  }

  const emailValue =
    profileLinks.find((l) => String((l as any)?.kind ?? "") === "email")?.value?.trim?.() ||
    DEFAULT_PROFILE_EMAIL;

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
    displayLinks,
    emailValue,
    updateProfile,
  });

  // (moved) SectionLabel, LeftRow, StatTile, SectionCard, CompactAchievement live in `ui/parts/*`

  let workplace = "";
  if (typeof (profile as any)?.workplace === "string") workplace = String((profile as any).workplace).trim();

  let locationLabel = "";
  if (typeof (profile as any)?.location === "string") locationLabel = String((profile as any).location).trim();

  let allAchievementItems: any[] = [];
  if (Array.isArray(items)) allAchievementItems = items as any[];
  const achievedItems = allAchievementItems.filter((i: any) => i?.achieved).slice(0, 6);


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
              avatarUrl={avatarUrl}
              name={name}
              bio={bio}
              xp={xp}
              profileBadge={profileBadge}
              workplace={workplace}
              locationLabel={locationLabel}
              emailValue={emailValue}
              displayLinks={displayLinks}
              isEditing={isEditing}
              editSessionId={editSessionId}
              editInitial={editInitial}
              saveAction={saveAction}
              isSaving={isSaving}
              handleStartEdit={handleStartEdit}
              handleCancelEdit={handleCancelEdit}
              handleStopHotkeys={handleStopHotkeys}
              achievedItems={achievedItems}
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


