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
import { usePathname, useSearchParams } from "next/navigation";
import { useUserProfile } from "entities/user";
import { useAchievementsData } from "../hooks/useAchievementsData";
import {
  ProfileSidebar,
  RangeButtons,
  SectionCard,
  StatTile,
  HelpList,
  QuickActionsGrid,
  PeoplePanel,
  AchievementsPanel,
  StatModePanel,
} from "./parts";
import { useProfileEdit, useProfilePeopleQuery, useProfileScreenViewModel, useStatsRangeQuery } from "../model/hooks";
import type { ProfilePeopleMode, StatTileModel } from "../model/types";
import { contributionStatsByRange, progressStatsByRange } from "../model/constants";
import { useProfileScreenUiColors } from "../colors/useProfileScreenUiColors";
import { FiAward, FiBarChart2, FiBookOpen, FiCheckCircle, FiCode, FiEdit3, FiFileText, FiPackage, FiTarget, FiUsers, FiVideo } from "react-icons/fi";
import { buildContributionTiles, buildProgressTiles, CONTRIBUTION_HINT, contributionHelpList, progressHelpList, weeklyTasksMock } from "./data";
import { buildPeopleUrl } from "../model/hooks/useProfilePeopleQuery/helpers";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getModeHref = React.useCallback(
    (mode: ProfilePeopleMode) => buildPeopleUrl({ pathname, searchParams, nextMode: mode }),
    [pathname, searchParams],
  );

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

  const rightColumnByMode: Record<ProfilePeopleMode, React.ReactNode> = {
    stats: statsPanel,
    followers: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <PeoplePanel mode="followers" />
      </VStack>
    ),
    following: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <PeoplePanel mode="following" />
      </VStack>
    ),
    achievements: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <AchievementsPanel items={items as any} />
      </VStack>
    ),
    materials: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Материалы"
          description="Подборка ваших пройденных материалов."
          icon={FiBookOpen}
          items={[
            { title: "CSS Grid — шпаргалка", description: "Материал · Пройдено", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
    weekly: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Задачи недели"
          description="Список решённых задач недели."
          icon={FiCheckCircle}
          pagination={{ pageSize: 3, ariaLabel: "Пагинация задач недели" }}
          items={weeklyTasksMock}
        />
      </VStack>
    ),
    projects: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Проекты"
          description="Подборка ваших завершённых проектов."
          icon={FiCode}
          items={[
            { title: "Проект: UI Kit", description: "Завершено", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
    articles: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Статьи"
          description="Прочитанные статьи."
          icon={FiFileText}
          items={[
            { title: "React memo: когда и зачем", description: "Прочитано · 6 минут", authorLabel: "AIFFA", authorHref: "/creators" },
            { title: "CSS Grid: шпаргалка", description: "Прочитано · 4 минуты", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
    hackathons: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Хакатоны"
          description="Ваше участие в хакатонах."
          icon={FiAward}
          items={[{ title: "Hackathon #1", description: "Участвовал · 2025", authorLabel: "AIFFA", authorHref: "/creators" }]}
        />
      </VStack>
    ),
    sessions: (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Сессии"
          description="Посещённые сессии."
          icon={FiVideo}
          items={[
            { title: "Сессия: разбор задач недели", description: "Посещено · 45 минут", authorLabel: "AIFFA", authorHref: "/creators" },
            { title: "Сессия: ревью проектов", description: "Посещено · 60 минут", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
    "contrib-materials": (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Вложено материалов"
          description="Материалы, добавленные/улучшенные вами."
          icon={FiBookOpen}
          items={[
            { title: "Материал: Accessibility basics", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" },
            { title: "Материал: Docker dev setup", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
    "contrib-projects": (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Вложено проектов"
          description="Проекты по вашему авторству."
          icon={FiPackage}
          items={[{ title: "Проект: базовый шаблон", description: "Авторство подтверждено", authorLabel: "AIFFA", authorHref: "/creators" }]}
        />
      </VStack>
    ),
    "contrib-weekly": (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Вложено задач недели"
          description="Задачи недели, опубликованные вами."
          icon={FiTarget}
          items={[
            { title: "Задача недели: замыкания", description: "Опубликовано", authorLabel: "AIFFA", authorHref: "/creators" },
            { title: "Задача недели: промисы", description: "Опубликовано", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
    "contrib-articles": (
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
        <StatModePanel
          title="Написано статей"
          description="Опубликованные вами статьи."
          icon={FiEdit3}
          items={[
            { title: "Как писать полезные статьи", description: "Опубликовано · 2025", authorLabel: "AIFFA", authorHref: "/creators" },
            { title: "Next.js metadata SEO", description: "Опубликовано · 2025", authorLabel: "AIFFA", authorHref: "/creators" },
          ]}
        />
      </VStack>
    ),
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
          templateColumns={{ base: "1fr", lg: "minmax(320px, 340px) 1fr" }}
          gap={4}
          alignItems={{ base: "start", lg: "stretch" }}
        >
          <GridItem>
            <Box
              py={{base: 0, lg: 7}}
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


