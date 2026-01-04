import React from "react";
import {
  Badge,
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
import { FiLink, FiMail, FiUsers } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";

const ProfileScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const name = typeof profile?.name === "string" ? profile.name : "";
  const bio = typeof profile?.bio === "string" ? profile.bio : "";
  const direction = typeof (profile as any).direction === "string" ? (profile as any).direction.trim() : "";

  const { items } = useAchievementsData(profile as any);

  // NOTE: По просьбе — без вычислений через хуки. Ставим цифры напрямую.
  const completedLessons = 8;
  const solvedThisWeek = 3;
  const contributedMaterialsCount = 5;
  const contributedProjectsCount = 0;
  const totalSolvedEver = 3;
  const authoredArticlesCount = 0;
  const isContributionLoaded = true;
  const isArticlesLoaded = true;
  const contributionHint = "По авторству в базе AIFFA";

  const contributionTiles = React.useMemo(
    () => [
      { label: "Вложено материалов", value: contributedMaterialsCount },
      { label: "Вложено проектов", value: contributedProjectsCount },
      { label: "Вложено задач недели", value: totalSolvedEver },
      { label: "Написано статей", value: authoredArticlesCount },
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

  const StatTile: React.FC<{ label: string; value: React.ReactNode; hint?: string }> = ({ label, value, hint }) => {
    return (
      <Box
        borderWidth="1px"
        borderColor={cardBorder}
        borderRadius="16px"
        bg={cardBg}
        p={{ base: 4, md: 5 }}
        minW={0}
      >
        <Text fontSize="sm" color={muted} mb={1}>
          {label}
        </Text>
        <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} lineHeight="1.1">
          {value}
        </Text>
        {!!hint && (
          <Text fontSize="sm" color={muted} mt={2}>
            {hint}
          </Text>
        )}
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
        <Heading
          as="h1"
          id="profile-page-title"
          size="lg"
          mb={6}
          textAlign="center"
        >
          Профиль
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(320px, 420px) 1fr" }}
          gap={{ base: 4, md: 6 }}
          alignItems={{ base: "start", lg: "stretch" }}
        >
          <GridItem>
            <Box
              borderWidth="1px"
              borderColor={cardBorder}
              borderRadius="20px"
              bg={cardBg}
              p={{ base: 5, md: 7 }}
              h={{ base: "auto", lg: "full" }}
            >
            <HStack spacing={4} align="start" flexDirection="column">
              <Avatar
                size="xl"
                name={name || "User"}
                src={withGithubAvatarSize((profile as any).avatarUrl || undefined, 160)}
                bg={(profile as any).avatarUrl ? "transparent" : "green.400"}
              />
              <VStack align="start" spacing={2} minW={0} flex={1}>
                {/* Фото → Имя → Описание → Редактировать → Подписчики/Подписан → Ссылки → Достижения */}
                <HStack spacing={2} flexWrap="wrap">
                  <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
                    {name || "Пользователь"}
                  </Text>
                  {!!direction && (
                    <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
                      {direction}
                    </Badge>
                  )}
                </HStack>

                <Text color={muted} sx={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  {bio || "Описание"}
                </Text>

                <Button
                  type="button"
                  onClick={() => {}}
                  aria-label="Редактировать профиль"
                  w="full"
                  maxW="360px"
                  h="44px"
                  borderRadius="md"
                  variant="outline"
                >
                  Редактировать профиль
                </Button>

                <HStack spacing={2} color={muted} pt={1} flexWrap="wrap">
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

                <VStack align="start" spacing={2} pt={2} w="full">
                  <Text fontWeight="semibold">Ссылки</Text>
                  {profileLinks.length > 0 ? (
                    <VStack align="start" spacing={2} w="full">
                      {profileLinks.slice(0, 6).map((l) => {
                        const kind = String((l as any)?.kind ?? "custom");
                        const href = buildLinkHref(l);
                        const label = getLinkLabel(l);
                        const IconEl = getLinkIcon(kind);
                        return (
                          <HStack key={l.id} spacing={2} minW={0}>
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
                  ) : (
                    <Text fontSize="sm" color={muted}>
                      Пока нет ссылок
                    </Text>
                  )}
                </VStack>
                <VStack align="start" spacing={2} pt={2} w="full">
                  <Text fontWeight="semibold">Достижения</Text>
                  {achievedItems.length > 0 ? (
                    <HStack spacing={2} flexWrap="wrap">
                      {achievedItems.map((it: any) => (
                        <CompactAchievement key={it.id} item={it} />
                      ))}
                    </HStack>
                  ) : (
                    <Text fontSize="sm" color={muted}>
                      Пока нет достижений
                    </Text>
                  )}
                </VStack>
              </VStack>
            </HStack>
            </Box>
          </GridItem>

          <GridItem minW={0}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }} minW={0}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
              <StatTile
                label="Пройдено материалов"
                value={completedLessons}
              />
              <StatTile label="Задач недели решено" value={solvedThisWeek} />
            </SimpleGrid>

            <Box borderWidth="1px" borderColor={cardBorder} borderRadius="20px" bg={cardBg} p={{ base: 5, md: 7 }}>
              <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={2}>
                Вклад в сообщество
              </Text>
              <Text color={muted} mb={4}>
                Счётчики собираются из вашего прогресса, задач недели и авторства материалов.
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                {contributionTiles.map((t) => (
                  <StatTile key={t.label} label={t.label} value={t.value} hint={contributionHint} />
                ))}
              </SimpleGrid>
            </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

    </Box>
  );
};

export default ProfileScreen;


