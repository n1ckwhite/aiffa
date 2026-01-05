import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserProfile, type ProfileLink } from "entities/user";
import { useAchievementsData } from "../hooks/useAchievementsData";
import PillBadge from "shared/ui/PillBadge";
import { formatCount } from "shared/functions/formatCount";
import { AppButtonLink, AppLink } from "shared/ui/AppLink";
import {
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiEdit3,
  FiFileText,
  FiLink,
  FiMail,
  FiMapPin,
  FiPackage,
  FiStar,
  FiTarget,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaCode,
  FaComments,
  FaFeatherAlt,
  FaInfinity,
  FaRegCalendarAlt,
} from "react-icons/fa";

const PLACEHOLDER_AVATAR_URL = "https://avatars.githubusercontent.com/u/100159537?v=4";
type StatTileModel = {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ComponentType<any>;
  tooltip?: string;
  accentColor?: string;
  emphasis?: boolean;
};

type StatsRange = "week" | "month" | "all";

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const profileAny = profile as any;
  const name = typeof profile?.name === "string" ? profile.name : "";
  const bio = typeof profile?.bio === "string" ? profile.bio : "";
  const avatarUrl =
    typeof profileAny?.avatarUrl === "string" && profileAny.avatarUrl.trim()
      ? profileAny.avatarUrl.trim()
      : PLACEHOLDER_AVATAR_URL;

  const avatarProxyUrl = (rawUrl: string, size: number) => {
    const encoded = encodeURIComponent(rawUrl);
    return `/api/avatar?url=${encoded}&s=${size}`;
  };

  const { items } = useAchievementsData(profile as any);

  // NOTE: По просьбе — без вычислений через хуки. Ставим цифры напрямую (по диапазонам тоже — хардкод).
  // Each block owns its own range (do NOT sync).
  const [statsRange, setStatsRange] = React.useState<StatsRange>("week");
  const [contributionRange, setContributionRange] = React.useState<StatsRange>("week");

  const rangeLabels: Record<StatsRange, string> = {
    week: "Неделя",
    month: "Месяц",
    all: "Всё время",
  };

  const statsByRange: Record<
    StatsRange,
    {
      completedLessons: number;
      solvedThisWeek: number;
      solvedProjectsCount: number;
      readArticlesCount: number;
      hackathonsParticipationCount: number;
      sessionsParticipationCount: number;
      motivationalTop: string;
      motivationalBottom: string;
    }
  > = {
    week: {
      completedLessons: 8,
      solvedThisWeek: 3,
      solvedProjectsCount: 0,
      readArticlesCount: 0,
      hackathonsParticipationCount: 0,
      sessionsParticipationCount: 0,
      motivationalTop: "Ты активнее 62% пользователей этой недели",
      motivationalBottom: "Ещё 2 задачи — и откроется новое достижение",
    },
    month: {
      completedLessons: 18,
      solvedThisWeek: 12,
      solvedProjectsCount: 1,
      readArticlesCount: 6,
      hackathonsParticipationCount: 1,
      sessionsParticipationCount: 2,
      motivationalTop: "Ты активнее 54% пользователей этого месяца",
      motivationalBottom: "Ещё 3 активности — и откроется новое достижение",
    },
    all: {
      completedLessons: 38,
      solvedThisWeek: 29,
      solvedProjectsCount: 4,
      readArticlesCount: 21,
      hackathonsParticipationCount: 3,
      sessionsParticipationCount: 7,
      motivationalTop: "Ты стабильно растёшь — продолжай в том же духе",
      motivationalBottom: "Выбери цель ниже — и получишь следующее достижение быстрее",
    },
  };

  const contributionByRange: Record<
    StatsRange,
    {
      contributedMaterialsCount: number;
      contributedProjectsCount: number;
      totalSolvedEver: number;
      authoredArticlesCount: number;
    }
  > = {
    week: { contributedMaterialsCount: 5, contributedProjectsCount: 0, totalSolvedEver: 3, authoredArticlesCount: 0 },
    month: { contributedMaterialsCount: 7, contributedProjectsCount: 1, totalSolvedEver: 12, authoredArticlesCount: 1 },
    all: { contributedMaterialsCount: 14, contributedProjectsCount: 2, totalSolvedEver: 29, authoredArticlesCount: 4 },
  };

  const currentStats = statsByRange[statsRange];
  const currentContribution = contributionByRange[contributionRange];

  const completedLessons = currentStats.completedLessons;
  const solvedThisWeek = currentStats.solvedThisWeek;
  const solvedProjectsCount = currentStats.solvedProjectsCount;
  const readArticlesCount = currentStats.readArticlesCount;
  const hackathonsParticipationCount = currentStats.hackathonsParticipationCount;
  const sessionsParticipationCount = currentStats.sessionsParticipationCount;

  const contributedMaterialsCount = currentContribution.contributedMaterialsCount;
  const contributedProjectsCount = currentContribution.contributedProjectsCount;
  const totalSolvedEver = currentContribution.totalSolvedEver;
  const authoredArticlesCount = currentContribution.authoredArticlesCount;
  const contributionHint = "По авторству в базе AIFFA";

  const progressTiles: StatTileModel[] = [
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
      emphasis: true,
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
  ];

  const contributionTiles: StatTileModel[] = [
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
  ];

  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const muted = useColorModeValue("gray.600", "whiteAlpha.700");
  const formBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const formFocusBorder = useColorModeValue("blue.500", "blue.300");
  const formBg = useColorModeValue("white", "blackAlpha.200");
  const headerNavIconColor = useColorModeValue("blue.700", "whiteAlpha.900");
  // Colors for left-side icons (must NOT call hooks inside useMemo).
  const peopleIconColor = useColorModeValue("blue.600", "blue.300");
  const xpIconColor = useColorModeValue("orange.600", "orange.300");
  const workIconColor = useColorModeValue("purple.600", "purple.300");
  const locationIconColor = useColorModeValue("green.600", "green.300");
  const mailIconColor = useColorModeValue("pink.600", "pink.300");
  const githubIconColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const linkIconColor = useColorModeValue("cyan.600", "cyan.300");

  const achievementsCardBg = useColorModeValue("orange.50", "whiteAlpha.50");
  const achievementsCardBorder = useColorModeValue("orange.200", "whiteAlpha.200");
  const achievementsIconBg = useColorModeValue("orange.100", "whiteAlpha.100");
  const achievementsIconColor = useColorModeValue("orange.700", "orange.200");
  const achievementsCountBg = useColorModeValue("white", "whiteAlpha.50");

  const leftIconColors = {
    people: peopleIconColor,
    xp: xpIconColor,
    work: workIconColor,
    location: locationIconColor,
    mail: mailIconColor,
    github: githubIconColor,
    link: linkIconColor,
  };

  const xp =
    typeof profileAny.xp === "number" && Number.isFinite(profileAny.xp) && profileAny.xp >= 0
      ? Math.trunc(profileAny.xp)
      : 0;

  const rawLinks = Array.isArray(profileAny.links) ? (profileAny.links as any[]) : [];
  const profileLinks: ProfileLink[] = rawLinks
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

  const normalized = (v: string) => v.trim().toLowerCase();
  const existing = new Set(profileLinks.map((l) => normalized(String((l as any)?.value ?? ""))));
  // Show only real user links (no global defaults).
  const displayLinks: ProfileLink[] = profileLinks;

  const hasRealGithub = profileLinks.some((l) => String((l as any)?.kind ?? "") === "github");
  const profileBadge = hasRealGithub
    ? ({ label: "Контрибьютор", colorScheme: "purple" as const } as const)
    : ({ label: "Автор AIFFA", colorScheme: "blue" as const } as const);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [draftName, setDraftName] = React.useState<string>(name);
  const [draftBio, setDraftBio] = React.useState<string>(bio);
  const [draftWorkplace, setDraftWorkplace] = React.useState<string>(profile.workplace ?? "");
  const [draftLocation, setDraftLocation] = React.useState<string>(profile.location ?? "");
  const [draftEmail, setDraftEmail] = React.useState<string>("");
  const [draftLinks, setDraftLinks] = React.useState<[string, string, string, string]>(["", "", "", ""]);

  const handleStartEdit = () => {
    setDraftName(name || "");
    setDraftBio(bio || "");
    // Use the *current UI values* (with fallbacks), so inputs are never empty unexpectedly.
    setDraftWorkplace(profile.workplace ?? "");
    setDraftLocation(profile.location ?? "");
    setDraftEmail(emailValue || "");
    const existingNonEmail = displayLinks
      .filter((l) => String((l as any)?.kind ?? "") !== "email")
      .map((l) => String((l as any)?.value ?? "").trim())
      .filter(Boolean);
    setDraftLinks([
      existingNonEmail[0] ?? "",
      existingNonEmail[1] ?? "",
      existingNonEmail[2] ?? "",
      existingNonEmail[3] ?? "",
    ]);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    const nextLinks: ProfileLink[] = [];
    // Email is not editable (keep current value as-is).
    const trimmedEmail = String(emailValue || "").trim();
    const cleaned = draftLinks.map((v) => String(v ?? "").trim());

    if (trimmedEmail) nextLinks.push({ id: "link-email", kind: "email", label: "Email", value: trimmedEmail });
    cleaned.forEach((v, idx) => {
      if (!v) return;
      const isGithub =
        /^https?:\/\/(www\.)?github\.com\//i.test(v) ||
        /^github\.com\//i.test(v) ||
        // username-like (keep it as github for icon)
        /^[a-zA-Z0-9-]{1,39}$/.test(v);
      nextLinks.push({
        id: `link-${idx + 1}`,
        kind: isGithub ? "github" : "custom",
        label: isGithub ? "GitHub" : "Ссылка",
        value: v,
      });
    });

    updateProfile({
      name: draftName.trim() || "Пользователь",
      bio: draftBio.trim(),
      workplace: draftWorkplace.trim(),
      location: draftLocation.trim(),
      links: nextLinks,
    });

    setIsEditing(false);
  };

  // Prevent global hotkeys / document keydown handlers from stealing focus while typing.
  const handleStopHotkeys = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  const buildLinkHref = (link: ProfileLink): string => {
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
    if (kind === "github") {
      if (/^https?:\/\//i.test(rawValue)) return rawValue;
      const v = rawValue.replace(/^@/, "").replace(/^github\.com\//i, "").trim();
      return `https://github.com/${v}`;
    }
    if (/^https?:\/\//i.test(rawValue)) return rawValue;
    return `https://${rawValue}`;
  };

  const getLinkIcon = (kind: string) => {
    if (kind === "email") return FiMail as any;
    if (kind === "telegram") return FaTelegramPlane as any;
    if (kind === "github") return FaGithub as any;
    return FiLink as any;
  };

  const getLinkLabel = (link: ProfileLink) => {
    const label = typeof (link as any)?.label === "string" ? (link as any).label.trim() : "";
    if (label) return label;
    const kind = String((link as any)?.kind ?? "custom");
    if (kind === "email") return "Email";
    if (kind === "telegram") return "Telegram";
    if (kind === "github") return "GitHub";
    return "Ссылка";
  };

  const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Text
      fontSize="xs"
      letterSpacing="0.08em"
      textTransform="uppercase"
      fontWeight="bold"
      color={useColorModeValue("gray.700", "whiteAlpha.700")}
      pt={2}
    >
      {children}
    </Text>
  );

  const LeftRow: React.FC<{
    icon: React.ComponentType<any>;
    iconColor: string;
    spacing?: number;
    children: React.ReactNode;
  }> = ({ icon, iconColor, spacing = 3, children }) => {
    return (
      <HStack spacing={spacing} align="center" w="full" minW={0}>
        <Box
          aria-hidden="true"
          w="22px"
          h="22px"
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={iconColor}
        >
          <Icon as={icon} boxSize="18px" />
        </Box>
        <Box minW={0} flex={1}>
          {children}
        </Box>
      </HStack>
    );
  };

  const workplace = typeof profile.workplace === "string" ? profile.workplace.trim() : "";
  const locationLabel = typeof profile.location === "string" ? profile.location.trim() : "";

  const emailValue =
    profileLinks.find((l) => String((l as any)?.kind ?? "") === "email")?.value?.trim?.() ||
    "bbycinka@yandex.ru";

  const achievedItems = (Array.isArray(items) ? items : []).filter((i: any) => i?.achieved).slice(0, 6);

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
    emphasis?: boolean;
  }> = ({ label, value, hint, icon, tooltip, accentColor, emphasis }) => {
    const watermarkColor = useColorModeValue("blackAlpha.150", "whiteAlpha.120");
    const hoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
    const focusRing = useColorModeValue("0 0 0 3px rgba(66,153,225,0.45)", "0 0 0 3px rgba(66,153,225,0.45)");
    // Colorful watermark by default (to highlight the tile), then de-accent on hover.
    const baseAccent = accentColor ?? useColorModeValue("blue.400", "blue.200");
    const formattedValue = typeof value === "number" ? formatCount(value) : value;
    const valueFontSize = emphasis ? ({ base: "2xl", md: "3xl" } as const) : ({ base: "xl", md: "2xl" } as const);

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
            transition: "transform 180ms ease, opacity 180ms ease, color 180ms ease",
          },
          "&:hover .stat-tile-watermark": {
            transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
            opacity: 0.12,
            color: watermarkColor,
          },
          "&:focus-visible .stat-tile-watermark": {
            transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
            opacity: 0.12,
            color: watermarkColor,
          },
        }}
      >
        {!!icon && (
          <Box
            aria-hidden="true"
            position="absolute"
            top={{ base: 2, md: 4 }}
            right={{ base: 2, md: 4 }}
            opacity={0.14}
            color={baseAccent}
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
          <Text fontWeight="bold" fontSize={valueFontSize} lineHeight="1.1">
            {formattedValue}
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
    actions?: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, description, icon, actions, children }) => {
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
          <HStack spacing={3} mb={2} align="center" justify="space-between" flexWrap="wrap" rowGap={2}>
            <HStack spacing={3} align="center">
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

            {!!actions ? <Box>{actions}</Box> : null}
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
            <Grid
              w="full"
              // Outer layout becomes 2 columns at `lg` (left column is ~420px),
              // so inner 2-column hero must NOT be active there, otherwise it squeezes.
              templateColumns={{
                base: "1fr",
                md: "minmax(260px, 320px) 1fr", // use space on wider single-column layouts
                lg: "1fr", // back to single column when outer grid switches to 2 columns
              }}
              columnGap={{ base: 0, md: 10, lg: 0 }}
              rowGap={{ base: 4, md: 0, lg: 4 }}
              alignItems="start"
            >
              <GridItem>
                <VStack
                  align={{ base: "center", md: "start" }}
                  spacing={3}
                  w="full"
                  minW={0}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Box
                    as="img"
                    // Responsive avatar size: small phones -> smaller, desktop -> bigger.
                    boxSize={{ base: "132px", sm: "152px", md: "184px", lg: "208px" }}
                    borderRadius="full"
                    objectFit="cover"
                    bg="transparent"
                    alt={name || "Пользователь"}
                    // Use responsive `srcSet` so we don't download 416×416 when the container is 208×208.
                    src={avatarProxyUrl(avatarUrl, 208)}
                    srcSet={[
                      `${avatarProxyUrl(avatarUrl, 132)} 132w`,
                      `${avatarProxyUrl(avatarUrl, 152)} 152w`,
                      `${avatarProxyUrl(avatarUrl, 184)} 184w`,
                      `${avatarProxyUrl(avatarUrl, 208)} 208w`,
                    ].join(", ")}
                    sizes="(min-width: 62em) 208px, (min-width: 48em) 184px, (min-width: 30em) 152px, 132px"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(e: any) => {
                      try {
                        e.currentTarget.src = avatarProxyUrl(PLACEHOLDER_AVATAR_URL, 208);
                        e.currentTarget.removeAttribute("srcset");
                      } catch {}
                    }}
                  />

                  <VStack align={{ base: "center", md: "start" }} spacing={2} w="full" minW={0}>
                    {isEditing ? (
                      <VStack
                        w="full"
                        maxW={{ base: "360px", md: "360px" }}
                        spacing={3}
                        align={{ base: "center", md: "start" }}
                        alignSelf={{ base: "center", md: "flex-start" }}
                      >
                        <Input
                          value={draftName}
                          onChange={(e) => setDraftName(e.target.value)}
                          onKeyDownCapture={handleStopHotkeys}
                          maxLength={250}
                          w="full"
                          h="40px"
                          aria-label="Имя"
                          borderRadius="sm"
                          borderColor={formBorder}
                          bg={formBg}
                          focusBorderColor={formFocusBorder}
                        />
                        <Textarea
                          value={draftBio}
                          onChange={(e) => setDraftBio(e.target.value)}
                          onKeyDownCapture={handleStopHotkeys}
                          resize="none"
                          rows={2}
                          w="full"
                          minH="72px"
                          aria-label="Bio"
                          maxLength={250}
                          borderRadius="sm"
                          borderColor={formBorder}
                          bg={formBg}
                          focusBorderColor={formFocusBorder}
                        />
                      </VStack>
                    ) : (
                      <>
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "2xl", md: "3xl" }}
                          lineHeight="1.15"
                          whiteSpace="normal"
                          overflowWrap="anywhere"
                          wordBreak="break-word"
                        >
                          {name || "Пользователь"}
                        </Text>

                        <Text
                          color={muted}
                          whiteSpace="normal"
                          overflowWrap="anywhere"
                          wordBreak="break-word"
                        >
                          {bio || "Описание"}
                        </Text>
                      </>
                    )}

                    {isEditing ? (
                      // Actions are rendered lower, right before Achievements (see below).
                      <Box />
                    ) : (
                      <Button
                        type="button"
                        onClick={handleStartEdit}
                        aria-label="Редактировать профиль"
                        w="full"
                        maxW={{ base: "360px", md: "300px", lg: "250px" }}
                        alignSelf={{ base: "center", md: "flex-start" }}
                        h="44px"
                        borderRadius="md"
                        fontWeight="semibold"
                        bg={useColorModeValue("blue.600", "blue.600")}
                        color="white"
                        transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                        _hover={{
                          transform: "translateY(-1px)",
                          bg: useColorModeValue("blue.700", "blue.700"),
                          boxShadow: "md",
                        }}
                        _active={{
                          transform: "translateY(0px)",
                          bg: useColorModeValue("blue.800", "blue.800"),
                          boxShadow: "sm",
                        }}
                      >
                        Редактировать профиль
                      </Button>
                    )}

                    <VStack spacing={2} w="full" pt={1} align={{ base: "center", md: "start" }}>
                      <HStack
                        spacing={2}
                        justify={{ base: "center", md: "flex-start" }}
                        w="full"
                        color={muted}
                        flexWrap="wrap"
                      >
                        <Icon as={FiUsers} color={leftIconColors.people} />
                        <Text>
                          <Text as="span" fontWeight="semibold" color="inherit">
                            {formatCount(0)}
                          </Text>{" "}
                          подписчики ·{" "}
                          <Text as="span" fontWeight="semibold" color="inherit">
                            {formatCount(0)}
                          </Text>{" "}
                          подписан
                        </Text>
                      </HStack>

                      <HStack
                        spacing={3}
                        justify={{ base: "center", md: "flex-start" }}
                        w="full"
                        flexWrap="wrap"
                        align="center"
                      >
                        <HStack spacing={1.5} color={muted}>
                          <Icon as={FiAward} color={leftIconColors.xp} />
                          <Text fontSize={{ base: "md", md: "lg" }}>
                            <Text
                              as="span"
                              fontWeight="bold"
                              color={useColorModeValue("gray.900", "whiteAlpha.900")}
                              fontSize={{ base: "md", md: "lg" }}
                            >
                              {formatCount(xp)}
                            </Text>{" "}
                            XP
                          </Text>
                        </HStack>
                        <Box>
                          <PillBadge
                            colorScheme={profileBadge.colorScheme as any}
                            variant="outline"
                            uppercase={false}
                          >
                            {profileBadge.label}
                          </PillBadge>
                        </Box>
                      </HStack>
                    </VStack>
                  </VStack>
                </VStack>
              </GridItem>

              <GridItem minW={0}>
                <Box
                  w="full"
                  maxW={{ base: "360px", md: "full", lg: "full" }}
                  mx={{ base: "auto", md: 0, lg: 0 }}
                >
                  <VStack align="start" spacing={2} w="full" textAlign="left">
                    <SectionLabel>Контакты</SectionLabel>

                    {isEditing ? (
                      <LeftRow icon={FiBriefcase as any} iconColor={leftIconColors.work}>
                        <Input
                          value={draftWorkplace}
                          onChange={(e) => setDraftWorkplace(e.target.value)}
                          onKeyDownCapture={handleStopHotkeys}
                          size="sm"
                          aria-label="Компания / место работы"
                          borderRadius="sm"
                          borderColor={formBorder}
                          bg={formBg}
                          focusBorderColor={formFocusBorder}
                        />
                      </LeftRow>
                    ) : workplace ? (
                      <LeftRow icon={FiBriefcase as any} iconColor={leftIconColors.work}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color={useColorModeValue("gray.800", "whiteAlpha.900")}
                          noOfLines={1}
                        >
                          {workplace}
                        </Text>
                      </LeftRow>
                    ) : null}

                    {isEditing ? (
                      <LeftRow icon={FiMapPin as any} iconColor={leftIconColors.location}>
                        <Input
                          value={draftLocation}
                          onChange={(e) => setDraftLocation(e.target.value)}
                          onKeyDownCapture={handleStopHotkeys}
                          size="sm"
                          aria-label="Локация"
                          borderRadius="sm"
                          borderColor={formBorder}
                          bg={formBg}
                          focusBorderColor={formFocusBorder}
                        />
                      </LeftRow>
                    ) : locationLabel ? (
                      <LeftRow icon={FiMapPin as any} iconColor={leftIconColors.location}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color={useColorModeValue("gray.800", "whiteAlpha.900")}
                          noOfLines={1}
                        >
                          {locationLabel}
                        </Text>
                      </LeftRow>
                    ) : null}

                    <LeftRow icon={FiMail as any} iconColor={leftIconColors.mail}>
                      <ChakraLink
                        href={`mailto:${emailValue}`}
                        color={useColorModeValue("blue.700", "blue.300")}
                        fontWeight="semibold"
                        maxW="360px"
                        noOfLines={1}
                        sx={{ overflowWrap: "anywhere" }}
                        aria-label={`Email: ${emailValue}`}
                      >
                        {emailValue}
                      </ChakraLink>
                    </LeftRow>

                    <SectionLabel>Ссылки</SectionLabel>

                    <VStack align="start" spacing={1.5} w="full" pt={1}>
                      {isEditing ? (
                        <VStack align="start" spacing={2} w="full">
                          {draftLinks.map((val, idx) => (
                            <LeftRow key={idx} icon={FiLink as any} iconColor={leftIconColors.link}>
                              <Input
                                value={val}
                                onChange={(e) => {
                                  const next = [...draftLinks] as [string, string, string, string];
                                  next[idx] = e.target.value;
                                  setDraftLinks(next);
                                }}
                                onKeyDownCapture={handleStopHotkeys}
                                size="sm"
                                placeholder={`Ссылка ${idx + 1}`}
                                aria-label={`Ссылка ${idx + 1}`}
                                borderRadius="sm"
                                borderColor={formBorder}
                                bg={formBg}
                                focusBorderColor={formFocusBorder}
                              />
                            </LeftRow>
                          ))}
                        </VStack>
                      ) : null}

                      {displayLinks
                        .filter((l) => String((l as any)?.kind ?? "") !== "email")
                        .slice(0, 6)
                        .map((l) => {
                        if (isEditing) return null;
                        const kind = String((l as any)?.kind ?? "custom");
                        const href = buildLinkHref(l);
                        const label = getLinkLabel(l);
                        const IconEl = getLinkIcon(kind);
                        const isBranded = kind === "github";
                        const value = String((l as any)?.value ?? "").trim();

                        return (
                          <HStack
                            key={l.id}
                            spacing={3}
                            minW={0}
                            justify="flex-start"
                            w="full"
                          >
                            <Box
                              aria-hidden="true"
                              w="22px"
                              h="22px"
                              flexShrink={0}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              color={isBranded ? leftIconColors.github : leftIconColors.link}
                            >
                              <Icon as={isBranded ? (FaGithub as any) : (IconEl as any)} boxSize="18px" />
                            </Box>
                            <ChakraLink
                              href={href}
                              isExternal
                              color={useColorModeValue("blue.700", "blue.300")}
                              fontWeight="semibold"
                              flex={1}
                              minW={0}
                              display="block"
                              whiteSpace="normal"
                              sx={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
                              aria-label={label}
                            >
                              {value}
                            </ChakraLink>
                          </HStack>
                        );
                      })}
                    </VStack>

                    {isEditing ? (
                      <HStack
                        w="full"
                        maxW="full"
                        justify="flex-start"
                        spacing={2}
                        pt={2}
                      >
                        <Button
                          type="button"
                          onClick={handleSaveEdit}
                          aria-label="Сохранить изменения профиля"
                          size="sm"
                          h="36px"
                          px={5}
                          borderRadius="md"
                          fontWeight="semibold"
                          bg={useColorModeValue("blue.600", "blue.600")}
                          color="white"
                          transition="background 0.2s ease"
                          _hover={{ bg: useColorModeValue("blue.700", "blue.700") }}
                          _active={{ bg: useColorModeValue("blue.800", "blue.800") }}
                        >
                          Сохранить
                        </Button>
                        <Button
                          type="button"
                          onClick={handleCancelEdit}
                          aria-label="Отмена редактирования"
                          size="sm"
                          h="36px"
                          px={5}
                          borderRadius="md"
                          variant="outline"
                        >
                          Отмена
                        </Button>
                      </HStack>
                    ) : null}
                  </VStack>
                  {achievedItems.length > 0 && (
                  <VStack align="start" spacing={2.5} w="full" textAlign="left" mt={5}>
                    <HStack w="full" justify="space-between" align="center">
                      <HStack spacing={2} align="center">
                        <Box
                          aria-hidden="true"
                          w="28px"
                          h="28px"
                          borderRadius="10px"
                          bg={achievementsIconBg}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color={achievementsIconColor}
                          flexShrink={0}
                        >
                          <Icon as={FiStar} boxSize="15px" />
                        </Box>
                        <Text fontWeight="bold" textAlign="left" w="full">
                          Достижения
                        </Text>
                      </HStack>

                      <Box
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        borderWidth="1px"
                        borderColor={achievementsCardBorder}
                        bg={achievementsCountBg}
                      >
                        <Text fontSize="xs" fontWeight="bold" color={achievementsIconColor}>
                          {formatCount(achievedItems.length)}
                        </Text>
                      </Box>
                    </HStack>
                    <Box>
                      <HStack spacing={2} flexWrap="wrap" justify="flex-start">
                        {achievedItems.map((it: any) => (
                          <CompactAchievement key={it.id} item={it} />
                        ))}
                      </HStack>
                    </Box>
                  </VStack>)}
                </Box>
              </GridItem>
            </Grid>
            </Box>
          </GridItem>

          <GridItem minW={0}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
            <SectionCard
              title="Статистика"
              description="Короткий срез по вашему прогрессу и активности."
              icon={FiBarChart2 as any}
              actions={
                <HStack spacing={2} flexWrap="wrap" justify="flex-start">
                  {(["week", "month", "all"] as const).map((r) => (
                    <Button
                      key={r}
                      size="sm"
                      variant={statsRange === r ? "solid" : "outline"}
                      borderRadius="full"
                      leftIcon={
                        r === "week" ? (
                          <Icon as={FaRegCalendarAlt} color={headerNavIconColor} />
                        ) : r === "month" ? (
                          <Icon as={FaCalendarAlt} color={headerNavIconColor} />
                        ) : (
                          <Icon as={FaInfinity} color={headerNavIconColor} />
                        )
                      }
                      onClick={() => setStatsRange(r)}
                      aria-label={`Период: ${rangeLabels[r]}`}
                    >
                      {rangeLabels[r]}
                    </Button>
                  ))}
                </HStack>
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

              <VStack align="start" spacing={2} color={muted} mt={{ base: 3, md: 4 }}>
                <Text fontSize="sm">
                  - Продолжай обучение в разделе{" "}
                  <AppLink to="/learn" fontWeight="semibold" aria-label="Открыть материалы">
                    Материалы
                  </AppLink>
                  .
                </Text>
                <Text fontSize="sm">
                  - Решай{" "}
                  <AppLink to="/weekly" fontWeight="semibold" aria-label="Открыть задачи недели">
                    задачи недели
                  </AppLink>{" "}
                  и собирай достижения.
                </Text>
                <Text fontSize="sm">
                  - Читай{" "}
                  <AppLink to="/blog" fontWeight="semibold" aria-label="Открыть блог">
                    статьи
                  </AppLink>{" "}
                  и прокачивай базу.
                </Text>
                <Text fontSize="sm">
                  - Участвуй в{" "}
                  <AppLink to="/hackathons" fontWeight="semibold" aria-label="Открыть хакатоны">
                    хакатонах
                  </AppLink>{" "}
                  и{" "}
                  <AppLink to="/sessions" fontWeight="semibold" aria-label="Открыть сессии">
                    сессиях
                  </AppLink>
                  .
                </Text>
              </VStack>

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
                      {currentStats.motivationalTop}
                    </Text>
                    <Text fontSize="sm" color={useColorModeValue("orange.800", muted)} mt={1}>
                      {currentStats.motivationalBottom}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <SimpleGrid
                mt={{ base: 4, md: 5 }}
                minChildWidth={{ base: "160px", sm: "180px" }}
                spacing={{ base: 2.5, md: 3 }}
              >
                <AppButtonLink
                  to="/learn"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("blue.700", "blue.700")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("blue.600", "blue.600")}
                  leftIcon={<Icon as={FaBookOpen} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("blue.700", "blue.800"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("blue.800", "blue.900"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к материалам"
                >
                  К материалам
                </AppButtonLink>
                <AppButtonLink
                  to="/weekly"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("green.700", "green.700")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("green.600", "green.600")}
                  leftIcon={<Icon as={FaClipboardList} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("green.700", "green.800"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("green.800", "green.900"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к задачам недели"
                >
                  Задачи недели
                </AppButtonLink>
                <AppButtonLink
                  to="/blog"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("purple.700", "purple.700")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("purple.600", "purple.600")}
                  leftIcon={<Icon as={FaFeatherAlt} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("purple.700", "purple.800"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("purple.800", "purple.900"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к блогу"
                >
                  Блог
                </AppButtonLink>
              </SimpleGrid>
            </SectionCard>

            <SectionCard
              title="Вклад в сообщество"
              description="Счётчики собираются из вашего прогресса, задач недели и авторства материалов."
              icon={FiUsers as any}
              actions={
                <HStack spacing={2} flexWrap="wrap" justify="flex-end">
                  {(["week", "month", "all"] as const).map((r) => (
                    <Button
                      key={r}
                      size="sm"
                      variant={contributionRange === r ? "solid" : "outline"}
                      borderRadius="full"
                      leftIcon={
                        r === "week" ? (
                          <Icon as={FaRegCalendarAlt} color={headerNavIconColor} />
                        ) : r === "month" ? (
                          <Icon as={FaCalendarAlt} color={headerNavIconColor} />
                        ) : (
                          <Icon as={FaInfinity} color={headerNavIconColor} />
                        )
                      }
                      onClick={() => setContributionRange(r)}
                      aria-label={`Период: ${rangeLabels[r]}`}
                    >
                      {rangeLabels[r]}
                    </Button>
                  ))}
                </HStack>
              }
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

              <VStack align="start" spacing={2} color={muted} mt={{ base: 3, md: 4 }}>
                <Text fontWeight="semibold">Как увеличить вклад</Text>
                <Text fontSize="sm">
                  - Публикуй{" "}
                  <AppLink to="/learn" fontWeight="semibold" aria-label="Открыть материалы">
                    материалы
                  </AppLink>{" "}
                  — это учитывается как авторство в базе AIFFA.
                </Text>
                <Text fontSize="sm">
                  - Публикуй проекты — это учитывается как авторство проектов.
                </Text>
                <Text fontSize="sm">
                  - Добавляй{" "}
                  <AppLink to="/weekly" fontWeight="semibold" aria-label="Открыть задачи недели">
                    задачи недели
                  </AppLink>{" "}
                  — это учитывается как авторство задач недели.
                </Text>
                <Text fontSize="sm">
                  - Пиши{" "}
                  <AppLink to="/blog" fontWeight="semibold" aria-label="Открыть блог">
                    статьи
                  </AppLink>{" "}
                  — это учитывается как авторство статей.
                </Text>
              </VStack>
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

              <SimpleGrid
                mt={{ base: 4, md: 5 }}
                minChildWidth={{ base: "160px", sm: "180px" }}
                spacing={{ base: 2.5, md: 3 }}
              >
                <AppButtonLink
                  to="/blog"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("orange.600", "orange.600")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("orange.500", "orange.500")}
                  leftIcon={<Icon as={FaFeatherAlt} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("orange.600", "orange.700"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("orange.700", "orange.800"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти в блог"
                >
                  Написать
                </AppButtonLink>
                <AppButtonLink
                  to="/learn"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("blue.700", "blue.700")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("blue.600", "blue.600")}
                  leftIcon={<Icon as={FaBookOpen} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("blue.700", "blue.800"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("blue.800", "blue.900"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к материалам"
                >
                  Материалы
                </AppButtonLink>
                <AppButtonLink
                  to="/weekly"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("green.700", "green.700")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("green.600", "green.600")}
                  leftIcon={<Icon as={FaClipboardList} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("green.700", "green.800"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("green.800", "green.900"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к задачам недели"
                >
                  Задачи недели
                </AppButtonLink>
                <AppButtonLink
                  to="/hackathons"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("pink.600", "pink.600")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("pink.500", "pink.500")}
                  leftIcon={<Icon as={FaCode} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("pink.600", "pink.700"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("pink.700", "pink.800"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к хакатонам"
                >
                  Хакатоны
                </AppButtonLink>
                <AppButtonLink
                  to="/sessions"
                  size="sm"
                  borderRadius="md"
                  fontWeight="semibold"
                  bg={useColorModeValue("cyan.800", "cyan.800")}
                  color="white"
                  borderWidth="1px"
                  borderColor={useColorModeValue("cyan.600", "cyan.600")}
                  leftIcon={<Icon as={FaComments} color="white" />}
                  sx={{ "& .chakra-button__icon": { color: "white" } }}
                  transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                  _hover={{ bg: useColorModeValue("cyan.700", "cyan.800"), transform: "translateY(-1px)", boxShadow: "sm" }}
                  _active={{ bg: useColorModeValue("cyan.800", "cyan.900"), transform: "translateY(0px)", boxShadow: "xs" }}
                  aria-label="Перейти к сессиям"
                >
                  Сессии
                </AppButtonLink>
              </SimpleGrid>
            </SectionCard>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

    </Box>
  );
};

export default ProfileScreen;


