import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserProfile, type ProfileLink } from "entities/user";
import { useAchievementsData } from "../hooks/useAchievementsData";
import { withGithubAvatarSize } from "@/shared/lib/github/withGithubAvatarSize";
import PillBadge from "shared/ui/PillBadge";
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiEdit3,
  FiFileText,
  FiLink,
  FiMail,
  FiPackage,
  FiTarget,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";

const ProfileScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const name = typeof profile?.name === "string" ? profile.name : "";
  const bio = typeof profile?.bio === "string" ? profile.bio : "";
  const placeholderAvatarUrl = "https://avatars.githubusercontent.com/u/89804687?v=4";
  const avatarUrl = typeof (profile as any)?.avatarUrl === "string" && (profile as any).avatarUrl.trim()
    ? (profile as any).avatarUrl.trim()
    : placeholderAvatarUrl;

  const { items } = useAchievementsData(profile as any);

  // NOTE: По просьбе — без вычислений через хуки. Ставим цифры напрямую.
  const completedLessons = 8;
  const solvedThisWeek = 3;
  const solvedProjectsCount = 0;
  const readArticlesCount = 0;
  const hackathonsParticipationCount = 0;
  const sessionsParticipationCount = 0;
  const contributedMaterialsCount = 5;
  const contributedProjectsCount = 0;
  const totalSolvedEver = 3;
  const authoredArticlesCount = 0;
  const isContributionLoaded = true;
  const isArticlesLoaded = true;
  const contributionHint = "По авторству в базе AIFFA";

  const progressTiles = React.useMemo(
    () => [
      {
        label: "Пройдено материалов",
        value: completedLessons,
        icon: FiBookOpen,
        accentColor: "blue.400",
        tooltip: "Сколько материалов вы уже изучили на платформе.",
      },
      {
        label: "Задач недели решено",
        value: solvedThisWeek,
        icon: FiCheckCircle,
        accentColor: "green.400",
        tooltip: "Сколько задач недели вы решили всего",
      },
      {
        label: "Пройдено проектов",
        value: solvedProjectsCount,
        icon: FiCode,
        accentColor: "purple.400",
        tooltip: "Сколько проектов вы завершили на платформе.",
      },
      {
        label: "Прочтено статей",
        value: readArticlesCount,
        icon: FiFileText,
        accentColor: "orange.400",
        tooltip: "Сколько статей из блога вы прочитали (по вашему прогрессу).",
      },
      {
        label: "Участие в хакатонах",
        value: hackathonsParticipationCount,
        icon: FiAward,
        accentColor: "pink.400",
        tooltip: "Ваше участие в хакатонах",
      },
      {
        label: "Участие на сессиях",
        value: sessionsParticipationCount,
        icon: FiVideo,
        accentColor: "cyan.400",
        tooltip: "Сколько сессий вы посетили (созвоны/разборы/встречи).",
      },
    ],
    [
      completedLessons,
      hackathonsParticipationCount,
      readArticlesCount,
      sessionsParticipationCount,
      solvedProjectsCount,
      solvedThisWeek,
    ],
  );

  const contributionTiles = React.useMemo(
    () => [
      {
        label: "Вложено материалов",
        value: contributedMaterialsCount,
        icon: FiBookOpen,
        accentColor: "blue.400",
        tooltip: "Сколько материалов вы вложили в базу AIFFA (по авторству).",
      },
      {
        label: "Вложено проектов",
        value: contributedProjectsCount,
        icon: FiPackage,
        accentColor: "purple.400",
        tooltip: "Сколько проектов вы добавили или улучшили (по авторству).",
      },
      {
        label: "Вложено задач недели",
        value: totalSolvedEver,
        icon: FiTarget,
        accentColor: "green.400",
        tooltip: "Сколько задач недели вы выложили (по авторству)",
      },
      {
        label: "Написано статей",
        value: authoredArticlesCount,
        icon: FiEdit3,
        accentColor: "orange.400",
        tooltip: "Сколько статей вы опубликовали в блоге AIFFA.",
      },
    ],
    [authoredArticlesCount, contributedMaterialsCount, contributedProjectsCount, totalSolvedEver],
  );

  const followersCount =
    typeof (profile as any).followersCount === "number" && isFinite((profile as any).followersCount) && (profile as any).followersCount >= 0
      ? Math.trunc((profile as any).followersCount)
      : 0;
  const followingCount =
    typeof (profile as any).followingCount === "number" && isFinite((profile as any).followingCount) && (profile as any).followingCount >= 0
      ? Math.trunc((profile as any).followingCount)
      : 0;
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const muted = useColorModeValue("gray.600", "whiteAlpha.700");

  const xp =
    typeof (profile as any).xp === "number" && Number.isFinite((profile as any).xp) && (profile as any).xp >= 0
      ? Math.trunc((profile as any).xp)
      : 0;

  const profileLinks = React.useMemo<ProfileLink[]>(() => {
    const raw = Array.isArray((profile as any).links) ? ((profile as any).links as any[]) : [];
    return raw
      .filter(Boolean)
      .map((l: any) => ({
        id: String(l?.id ?? ""),
        kind:
          l?.kind === "email" || l?.kind === "telegram" || l?.kind === "github" || l?.kind === "website" || l?.kind === "custom"
            ? l.kind
            : "custom",
        label: typeof l?.label === "string" ? l.label : "",
        value: typeof l?.value === "string" ? l.value : "",
      }))
      .filter((l: any) => !!l.id && !!String(l.value || "").trim()) as ProfileLink[];
  }, [profile]);

  const profileBadge = React.useMemo(() => {
    const hasGithub = profileLinks.some((l) => String((l as any)?.kind ?? "") === "github");
    if (hasGithub) return { label: "Контрибьютор", colorScheme: "purple" as const };
    return { label: "Автор AIFFA", colorScheme: "blue" as const };
  }, [profileLinks]);

  const buildLinkHref = React.useCallback((link: ProfileLink): string => {
    const kind = String((link as any)?.kind ?? "custom");
    const rawValue = String((link as any)?.value ?? "").trim();
    if (!rawValue) return "#";

    if (kind === "email") {
      const v = rawValue.replace(/^mailto:/i, "");
      return `mailto:${v}`;
    }
    if (kind === "telegram") {
      if (/^https?:\/\//i.test(rawValue)) return rawValue;
      const v = rawValue.replace(/^@/, "").replace(/^t\.me\//i, "");
      return `https://t.me/${v}`;
    }
    if (/^https?:\/\//i.test(rawValue)) return rawValue;
    return `https://${rawValue}`;
  }, []);

  const getLinkIcon = React.useCallback((kind: string) => {
    if (kind === "email") return FiMail as any;
    if (kind === "telegram") return FaTelegramPlane as any;
    return FiLink as any;
  }, []);

  const getLinkLabel = React.useCallback((link: ProfileLink) => {
    const label = typeof (link as any)?.label === "string" ? (link as any).label.trim() : "";
    if (label) return label;
    const kind = String((link as any)?.kind ?? "custom");
    if (kind === "email") return "Email";
    if (kind === "telegram") return "Telegram";
    return "Ссылка";
  }, []);

  const achievedItems = React.useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return list.filter((i: any) => i?.achieved).slice(0, 6);
  }, [items]);

  const CompactAchievement: React.FC<{ item: any }> = ({ item }) => {
    const ring = `conic-gradient(${item.from} 0 50%, ${item.to} 50% 100%)`;
    const bg = useColorModeValue("white", "gray.900");
    const label = String(item?.label ?? "Достижение");
    return (
      <Tooltip hasArrow openDelay={220} placement="top" label={label}>
        <Box
          as="button"
          type="button"
          aria-label={label}
          tabIndex={0}
          h="44px"
          w="44px"
          borderRadius="full"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="transform 160ms ease"
          _hover={{ transform: "translateY(-1px)" }}
        >
          <Box position="absolute" inset={0} borderRadius="full" bg={ring} />
          <Box position="absolute" inset="4px" borderRadius="full" bg={bg} borderWidth="1px" borderColor={item.color} />
          <Box
            position="relative"
            w="24px"
            h="24px"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgGradient={`linear(to-br, ${item.from}, ${item.to})`}
            color="white"
            fontSize="14px"
          >
            {item?.icon ? React.createElement(item.icon) : null}
          </Box>
        </Box>
      </Tooltip>
    );
  };

  const StatTile: React.FC<{
    label: string;
    value: React.ReactNode;
    hint?: string;
    icon?: React.ComponentType<any>;
    tooltip?: string;
    accentColor?: string;
  }> = ({ label, value, hint, icon, tooltip, accentColor }) => {
    const watermarkColor = useColorModeValue("blackAlpha.150", "whiteAlpha.120");
    const hoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
    const focusRing = useColorModeValue("0 0 0 3px rgba(66,153,225,0.45)", "0 0 0 3px rgba(66,153,225,0.45)");
    const hoverAccent = accentColor ?? useColorModeValue("blue.400", "blue.200");

    const tile = (
      <Box
        borderWidth="1px"
        borderColor={cardBorder}
        borderRadius={{ base: "14px", md: "16px" }}
        bg={cardBg}
        p={{ base: 3, md: 5 }}
        minW={0}
        minH={{ base: "112px", md: "124px" }}
        position="relative"
        overflow="hidden"
        display="grid"
        gridTemplateRows="auto 1fr auto"
        tabIndex={tooltip ? 0 : undefined}
        _focusVisible={tooltip ? { boxShadow: focusRing, outline: "none" } : undefined}
        transition="border-color 160ms ease, transform 160ms ease"
        _hover={{ borderColor: hoverBorder, transform: "translateY(-1px)" }}
        sx={{
          "& .stat-tile-watermark": {
            transition: "transform 180ms ease, opacity 180ms ease",
          },
          "&:hover .stat-tile-watermark": {
            transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
            opacity: 0.18,
            color: hoverAccent,
          },
          "&:focus-visible .stat-tile-watermark": {
            transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
            opacity: 0.18,
            color: hoverAccent,
          },
        }}
      >
        {!!icon && (
          <Box
            aria-hidden="true"
            position="absolute"
            top={{ base: 2, md: 4 }}
            right={{ base: 2, md: 4 }}
            opacity={0.1}
            color={watermarkColor}
            transform="rotate(-6deg)"
            pointerEvents="none"
            className="stat-tile-watermark"
          >
            <Icon as={icon} boxSize={{ base: "38px", md: "56px" }} />
          </Box>
        )}

        {/* Fixed header height so values align across columns even when label wraps */}
        <Box pr={{ base: 8, md: 12 }}>
          <Text
            fontSize="sm"
            color={muted}
            lineHeight="1.25"
            whiteSpace="normal"
            overflowWrap="anywhere"
            wordBreak="break-word"
          >
            {label}
          </Text>
        </Box>

        {/* Value is centered vertically between label and hint */}
        <Box display="flex" alignItems="center" pr={{ base: 8, md: 12 }}>
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} lineHeight="1.1">
            {value}
          </Text>
        </Box>

        {/* Keep a consistent bottom row so the value stays centered even when hint is missing */}
        <Box
          pr={{ base: 8, md: 12 }}
          display="flex"
          alignItems="flex-end"
        >
          {!!hint ? (
            <Text fontSize="sm" color={muted}>
              {hint}
            </Text>
          ) : null}
        </Box>
      </Box>
    );

    if (!tooltip) return tile;

    return (
      <Tooltip hasArrow openDelay={240} placement="top" label={tooltip} shouldWrapChildren>
        {tile}
      </Tooltip>
    );
  };

  const SectionCard: React.FC<{
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    children: React.ReactNode;
  }> = ({ title, description, icon, children }) => {
    // Variant A: Glass (no gradients)
    const glassBg = useColorModeValue("whiteAlpha.900", "blackAlpha.300");
    const glassBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
    const accent = useColorModeValue("blue.600", "blue.300");
    const headerIconBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

    return (
      <Box
        borderWidth="1px"
        borderColor={glassBorder}
        borderRadius="24px"
        bg={glassBg}
        p={{ base: 4, md: 7 }}
        position="relative"
        overflow="hidden"
        boxShadow="none"
        transition="none"
        sx={{
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
        }}
      >
        <Box position="relative">
          <HStack spacing={3} mb={2} align="center">
            <Box
              aria-hidden="true"
              w="36px"
              h="36px"
              borderRadius="14px"
              bg={headerIconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={accent}
              flexShrink={0}
            >
              <Icon as={icon} boxSize="18px" />
            </Box>
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
              {title}
            </Text>
          </HStack>
          <Text color={muted} mb={4}>
            {description}
          </Text>

          {children}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      as="main"
      role="main"
      position="relative"
      overflow="hidden"
      px={{ base: 3, md: 6 }}
      py={{ base: 6, md: 10 }}
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
            <HStack
              spacing={4}
              align={{ base: "center", lg: "start" }}
              flexDirection="column"
              w="full"
              textAlign={{ base: "center", lg: "left" }}
            >
              <Avatar
                // Responsive avatar size: small phones -> smaller, desktop -> bigger.
                boxSize={{ base: "132px", sm: "152px", md: "184px", lg: "208px" }}
                name={name || "User"}
                src={withGithubAvatarSize(avatarUrl, 416)}
                bg="transparent"
              />
              <VStack align={{ base: "center", lg: "start" }} spacing={2} minW={0} flex={1} w="full">
                {/* Фото → Имя → Описание → Редактировать → Подписчики/Подписан → Ссылки → Достижения */}
                <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                  <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
                    {name || "Пользователь"}
                  </Text>
                </HStack>

                <Text
                  color={muted}
                  sx={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  {bio || "Описание"}
                </Text>

                <Button
                  type="button"
                  onClick={() => {}}
                  aria-label="Редактировать профиль"
                  w="full"
                  maxW={{base: "300px", lg: "250px"}}
                  mx={0}
                  alignSelf={{base: "center", lg: "flex-start"}}
                  h="44px"
                  borderRadius="md"
                  variant="outline"
                >
                  Редактировать профиль
                </Button>

                <HStack
                  spacing={2}
                  color={muted}
                  pt={1}
                  flexWrap="wrap"
                  justify={{ base: "center", lg: "flex-start" }}
                  w="full"
                >
                  <Icon as={FiUsers} />
                  <Text>
                    <Text as="span" fontWeight="semibold" color="inherit">
                      {followersCount}
                    </Text>{" "}
                    подписчики ·{" "}
                    <Text as="span" fontWeight="semibold" color="inherit">
                      {followingCount}
                    </Text>{" "}
                    подписан
                  </Text>
                </HStack>

                <HStack
                  spacing={3}
                  pt={1}
                  flexWrap="wrap"
                  justify={{ base: "center", lg: "flex-start" }}
                  w="full"
                >
                  <HStack spacing={1.5} color={muted}>
                    <Icon as={FiAward} />
                    <Text fontSize="sm">
                      <Text as="span" fontWeight="semibold" color="inherit">
                        {xp}
                      </Text>{" "}
                      XP
                    </Text>
                  </HStack>
                  <Box>
                    <PillBadge colorScheme={profileBadge.colorScheme as any} variant="outline" uppercase={false}>
                      {profileBadge.label}
                    </PillBadge>
                  </Box>
                </HStack>
                {profileLinks.length > 0 && (
                <VStack align={{ base: "center", lg: "start" }} spacing={2} w="full">
                    <VStack align={{ base: "center", lg: "start" }} spacing={2} w="full">
                      {profileLinks.slice(0, 6).map((l) => {
                        const kind = String((l as any)?.kind ?? "custom");
                        const href = buildLinkHref(l);
                        const label = getLinkLabel(l);
                        const IconEl = getLinkIcon(kind);
                        return (
                          <HStack
                            key={l.id}
                            spacing={2}
                            minW={0}
                            justify={{ base: "center", lg: "flex-start" }}
                            w="full"
                          >
                            <Icon as={IconEl} color={muted} />
                            <ChakraLink
                              href={href}
                              isExternal
                              color={useColorModeValue("blue.700", "blue.300")}
                              fontWeight="semibold"
                              maxW="360px"
                              noOfLines={1}
                              sx={{ overflowWrap: "anywhere" }}
                              aria-label={label}
                            >
                              {String(l.value || "").trim()}
                            </ChakraLink>
                          </HStack>
                        );
                      })}
                    </VStack>
                </VStack>)}
                {achievedItems.length > 0 && (
                <VStack align={{ base: "center", lg: "start" }} spacing={2} w="full">
                  <Text fontWeight="semibold">Достижения</Text>
                    <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                      {achievedItems.map((it: any) => (
                        <CompactAchievement key={it.id} item={it} />
                      ))}
                    </HStack>
                </VStack>)}
              </VStack>
            </HStack>
            </Box>
          </GridItem>

          <GridItem minW={0}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
            <SectionCard
              title="Статистика"
              description="Короткий срез по вашему прогрессу и активности."
              icon={FiBarChart2 as any}
            >
              {/* Prefer 3 columns on desktop, but never "squeeze" tiles on narrower widths */}
              <SimpleGrid
                minChildWidth={{ base: "100%", sm: "200px", md: "250px" }}
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
                  />
                ))}
              </SimpleGrid>

              <Box
                mt={{ base: 4, md: 5 }}
                borderWidth="1px"
                borderColor={useColorModeValue("orange.200", "whiteAlpha.200")}
                bg={useColorModeValue("orange.50", "whiteAlpha.50")}
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
                    bg={useColorModeValue("orange.100", "whiteAlpha.100")}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    color={useColorModeValue("orange.700", "orange.200")}
                  >
                    <Icon as={FiAward} boxSize="14px" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color={useColorModeValue("orange.900", "whiteAlpha.900")} fontWeight="semibold">
                      Ты активнее <Text as="span" color="inherit">62%</Text> пользователей этой недели
                    </Text>
                    <Text fontSize="sm" color={useColorModeValue("orange.800", muted)} mt={1}>
                      Ещё <Text as="span" fontWeight="semibold" color="inherit">2</Text> задачи — и откроется новое достижение
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </SectionCard>

            <SectionCard
              title="Вклад в сообщество"
              description="Счётчики собираются из вашего прогресса, задач недели и авторства материалов."
              icon={FiUsers as any}
            >
              <SimpleGrid minChildWidth={{ base: "100%", sm: "260px", md: "320px" }} spacing={3}>
                {contributionTiles.map((t) => (
                  <StatTile
                    key={t.label}
                    label={t.label}
                    value={t.value}
                    hint={contributionHint}
                    icon={(t as any).icon}
                    tooltip={(t as any).tooltip}
                    accentColor={(t as any).accentColor}
                  />
                ))}
              </SimpleGrid>
              <Box
                mt={{ base: 4, md: 5 }}
                borderWidth="1px"
                borderColor={useColorModeValue("orange.200", "whiteAlpha.200")}
                bg={useColorModeValue("orange.50", "whiteAlpha.50")}
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
                    bg={useColorModeValue("orange.100", "whiteAlpha.100")}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    color={useColorModeValue("orange.700", "orange.200")}
                  >
                    <Icon as={FiAward} boxSize="14px" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue("orange.900", "whiteAlpha.900")}>
                      Спасибо за вклад в сообщество
                    </Text>
                    <Text fontSize="sm" color={useColorModeValue("orange.800", muted)} mt={1}>
                      Любое авторство и активность помогают AIFFA становиться лучше для всех.
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </SectionCard>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

    </Box>
  );
};

export default ProfileScreen;


