import React from "react";
import { Box, HStack, VStack, Text, Avatar, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  FiBookOpen,
  FiTarget,
  FiUsers,
  FiAward,
  FiStar,
  FiExternalLink,
  FiHeart,
  FiShield,
  FiFileText,
  FiUser,
  FiUserCheck,
  FiMonitor,
  FiServer,
  FiCpu,
  FiCloud,
  FiLayers,
  FiCheckSquare,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Creator } from "../../model/types";

type CreatorCardProps = {
  creator: Creator;
  index: number;
  mode?: "materials" | "weekly" | "articles" | "projects" | "hackathons";
  showRank?: boolean;
};

const roleLabelMap: Record<Creator["role"], string> = {
  author: "Автор материалов",
  mentor: "Ментор",
  reviewer: "Ревьюер",
  maintainer: "Мейнтейнер",
};

const roleIconMap: Record<Creator["role"], IconType> = {
  author: FiFileText,
  mentor: FiUser,
  reviewer: FiUserCheck,
  maintainer: FiShield,
};

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, index, mode = "materials", showRank = true }) => {
  const { name, role, avatar, direction, contributions, profileLinks } = creator;
  const { lessons, weeklyTasks, reviews, projects } = contributions;
  const isWeeklyMode = mode === "weekly";
  const isArticlesMode = mode === "articles";
  const isProjectsMode = mode === "projects";
  const isHackathonMode = mode === "hackathons";

  const goldBorder = useColorModeValue("yellow.400", "yellow.300");
  const goldColor = useColorModeValue("yellow.700", "yellow.200");

  const silverBorder = useColorModeValue("purple.400", "purple.300");
  const silverColor = useColorModeValue("purple.600", "purple.200");

  const bronzeBorder = useColorModeValue("orange.500", "orange.300");
  const bronzeColor = useColorModeValue("orange.700", "orange.200");

  const defaultBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const defaultColor = useColorModeValue("gray.500", "gray.300");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const pillBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const pillHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");

  const rankBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");

  const rankPaletteArticles = {
    1: { border: goldBorder, color: goldColor },
    2: { border: silverBorder, color: silverColor },
    3: { border: bronzeBorder, color: bronzeColor },
    default: { border: defaultBorder, color: defaultColor },
  } as const;

  const rankPalette = isArticlesMode || isWeeklyMode ? rankPaletteArticles : rankPaletteArticles;

  const rankBorder =
    index === 1 ? rankPalette[1].border : index === 2 ? rankPalette[2].border : index === 3 ? rankPalette[3].border : rankPalette.default.border;
  const rankColor =
    index === 1 ? rankPalette[1].color : index === 2 ? rankPalette[2].color : index === 3 ? rankPalette[3].color : rankPalette.default.color;
  const metaColor = useColorModeValue("gray.500", "gray.300");
  const materialsIconColor = useColorModeValue("orange.400", "orange.300");
  const tasksIconColor = useColorModeValue("blue.400", "blue.300");
  const reviewsIconColor = useColorModeValue("green.500", "green.300");
  const linkColor = useColorModeValue("blue.600", "blue.200");
  // Фон карточек как у «пилюль» в Hero: плотный в светлой теме и whiteAlpha.100 в тёмной
  const cardBgMaterials = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const cardBgWeekly = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const roleColors = {
    author: { light: "orange.500", dark: "orange.300" },
    mentor: { light: "teal.500", dark: "teal.300" },
    reviewer: { light: "purple.500", dark: "purple.300" },
    maintainer: { light: "blue.600", dark: "blue.300" },
  } as const;
  const currentRoleColors = roleColors[role];
  const roleColor = useColorModeValue(currentRoleColors.light, currentRoleColors.dark);
  const RoleIcon = roleIconMap[role];
  const roleBg = useColorModeValue("white", "whiteAlpha.100");
  const roleBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const primaryTextColor = useColorModeValue("gray.800", "gray.100");
  const bgIconColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  const avatarPalettes = [
    { light: "purple.600", dark: "purple.300" },
    { light: "green.600", dark: "green.300" },
    { light: "teal.600", dark: "teal.300" },
    { light: "blue.600", dark: "blue.300" },
    { light: "pink.600", dark: "pink.300" },
    { light: "orange.500", dark: "orange.300" },
  ] as const;

  const avatarIndex = React.useMemo(() => {
    if (!name) return 0;
    const initials = name.trim().slice(0, 2);
    const sum = Array.from(initials).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return sum % avatarPalettes.length;
  }, [name]);

  const avatarBg = useColorModeValue(
    avatarPalettes[avatarIndex].light,
    avatarPalettes[avatarIndex].dark,
  );
  const isTop3 = index <= 3 && showRank;
  const isTop1 = index === 1;
  const isTop2 = index === 2;
  const isTop3Only = index === 3;

  const DirectionIcon = React.useMemo<IconType>(() => {
    const key = (direction || "").toLowerCase();
    if (key.includes("front")) return FiMonitor;
    if (key.includes("back")) return FiServer;
    if (key.includes("machine") || key.includes("ml") || key.includes("data")) return FiCpu;
    if (key.includes("devops") || key.includes("infra")) return FiCloud;
    if (key.includes("fullstack")) return FiLayers;
    if (key.includes("community")) return FiUsers;
    return RoleIcon;
  }, [direction, RoleIcon]);

  const cardHref = profileLinks[0]?.href;

  const gratitudeMessagesMaterials: string[] = [
    "Спасибо от комьюнити AIFFA — твои материалы помогают многим сделать первый шаг.",
    "Спасибо за задачи и идеи — с тобой участникам проще расти и не застревать в сложностях.",
    "Спасибо, что делишься опытом — именно такие авторы делают AIFFA живой экосистемой.",
  ];

  const gratitudeMessagesWeekly: string[] = [
    "Спасибо за задачи недели — они помогают каждую неделю делать маленький, но важный шаг вперёд.",
    "Спасибо за weekly‑челленджи — с ними сообществу проще не выпадать из практики и держать темп.",
    "Спасибо за живые, прикладные задачи недели — за счёт них AIFFA остаётся местом про реальную работу.",
  ];

  const gratitudeMessagesArticles: string[] = [
    "Спасибо за статьи — через твои разборы и истории многим проще понять, как всё работает в реальных проектах.",
    "Спасибо за подробные статьи и примеры — они помогают не только читать теорию, но и применять её в своей работе.",
    "Спасибо за статьи с личным опытом — такие тексты делают AIFFA местом, куда хочется возвращаться за смыслом, а не только за задачами.",
  ];

  const gratitudeMessagesHackathons: string[] = [
    "Спасибо за хакатонные форматы — с ними участники могут безопасно пробовать сложные вещи и не бояться ошибаться.",
    "Спасибо за хакатоны и разборы — они помогают командам быстрее проверять идеи и находить сильные решения.",
    "Спасибо за хакатоны с живыми задачами — за счёт них AIFFA остаётся местом про реальный продукт и командную работу.",
  ];

  const gratitudeMessagesProjects: string[] = [
    "Спасибо за проекты — на них участники учатся собирать продакшн и видеть целую картину.",
    "Спасибо за проектные вклады — они помогают командам быстрее расти и делать настоящие фичи.",
    "Спасибо за живые проекты — они дают опыт, который невозможно получить только из задач.",
  ];

  const sourceMessages = isWeeklyMode
    ? gratitudeMessagesWeekly
    : isArticlesMode
    ? gratitudeMessagesArticles
    : isProjectsMode
    ? gratitudeMessagesProjects
    : isHackathonMode
    ? gratitudeMessagesHackathons
    : gratitudeMessagesMaterials;

  const descriptionText = sourceMessages[index - 1] ?? sourceMessages[sourceMessages.length - 1];

  const rootProps = cardHref
    ? ({
        as: "a",
        href: cardHref,
        target: "_blank",
        rel: "noopener noreferrer",
      } as const)
    : ({ as: "div" } as const);

  return (
    <Box
      {...rootProps}
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      w="full"
      bg={isWeeklyMode ? cardBgWeekly : cardBgMaterials}
      boxShadow={useColorModeValue("sm", "sm")}
      borderWidth="1px"
      borderColor={pillBorderColor}
      position="relative"
      overflow="hidden"
      role="group"
      cursor={cardHref ? "pointer" : "default"}
      aria-label={cardHref ? `Открыть ссылку автора ${name}` : undefined}
      transition="background-color 0.18s ease-out, box-shadow 0.2s ease-out, transform 0.16s ease-out, border-color 0.16s ease-out"
      _hover={{
        bg: pillHoverBg,
        boxShadow: useColorModeValue("md", "md"),
        borderColor: accentColor,
        transform: "translateY(-1px)",
      }}
    >
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        overflow="hidden"
      >
        <Icon
          as={DirectionIcon}
          boxSize={28}
          color={bgIconColor}
          position="absolute"
          right={-2}
          bottom={-4}
          transform="rotate(-8deg) translate3d(0, 0, 0)"
          opacity={0.16}
          transition="transform 0.25s ease-out, opacity 0.25s ease-out"
          _groupHover={{
            transform: "rotate(-2deg) translate3d(10px, -8px, 0)",
            opacity: 0.24,
          }}
          aria-hidden="true"
        />
      </Box>
      <Box position="relative" display="flex" flexDirection="column" h="100%">
        <Box flex="1">
          <HStack justify="space-between" align="center" mb={2} spacing={2}>
            {isTop3 && (
              <HStack
                spacing={1}
                px={2}
                py={0.5}
                borderRadius="full"
                borderWidth="1px"
                borderColor={rankBorder}
                bg={rankBg}
                alignItems="center"
              >
                <Icon
                  as={FiAward}
                  boxSize={3.5}
                  aria-hidden="true"
                  color={rankColor}
                />
                <Text as="span" fontSize="xs" fontWeight="semibold" color={rankColor}>
                  #{index}
                </Text>
              </HStack>
            )}
            {cardHref && (
              <Icon
                as={FiExternalLink}
                boxSize={3.5}
                aria-hidden="true"
                color={linkColor}
              />
            )}
          </HStack>

        <HStack align="flex-start" spacing={3} mt={0} mb={2}>
          <Box
            position="relative"
            transition="transform 0.18s ease-out"
            _groupHover={{ transform: "translateY(-2px)" }}
          >
            <Avatar
              size="md"
              name={name}
              src={avatar}
              position="relative"
              bg={avatarBg}
              color="white"
            />
          </Box>
          <VStack align="flex-start" spacing={1}>
            <Text
              fontSize="md"
              fontWeight="semibold"
              letterSpacing="-0.02em"
              color={primaryTextColor}
              noOfLines={1}
            >
              {name}
            </Text>
            <HStack spacing={1}>
              <Box
                as="span"
                px={2.5}
                py={0.5}
                borderRadius="full"
                borderWidth="1px"
                borderColor={roleBorder}
                bg={roleBg}
                fontSize="xs"
                fontWeight="semibold"
                color={roleColor}
                display="inline-flex"
                alignItems="center"
                gap={1}
              >
                <Icon as={DirectionIcon} boxSize={3} aria-hidden="true" />
                <Text as="span">{direction || roleLabelMap[role]}</Text>
              </Box>
            </HStack>
          </VStack>
        </HStack>

        <VStack
          spacing={1}
          fontSize="xs"
          color={metaColor}
          mb={3}
          w="full"
          align="flex-start"
        >
                      <Box w="full">
              <Text
                fontSize="xs"
                fontWeight="medium"
                color={primaryTextColor}
                textAlign="left"
                whiteSpace="normal"
                wordBreak="break-word"
              >
                {descriptionText}
              </Text>
            </Box>
          {!isWeeklyMode && !isArticlesMode && !isProjectsMode && !isHackathonMode && (
            <HStack spacing={2}>
              <Icon as={FiBookOpen} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
              <Text as="span">
                Поделился{" "}
                <Text as="span" fontWeight="semibold">
                  {lessons} материалами
                </Text>
              </Text>
            </HStack>
          )}
          {isWeeklyMode && (
            <HStack spacing={2}>
              <Icon as={FiCheckSquare} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
              <Text as="span">
                Придумал{" "}
                <Text as="span" fontWeight="semibold">
                  {weeklyTasks} задач недели
                </Text>
              </Text>
            </HStack>
          )}
          {!isWeeklyMode && !isArticlesMode && !isProjectsMode && !isHackathonMode && (
            <HStack spacing={2}>
              <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
              <Text as="span">
                Придумал{" "}
                <Text as="span" fontWeight="semibold">
                  {weeklyTasks} задач для материала
                </Text>
              </Text>
            </HStack>
          )}
          {isProjectsMode && (
            <>
              <HStack spacing={2}>
                <Icon as={FiLayers} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
                <Text as="span">
                  Участвовал в{" "}
                  <Text as="span" fontWeight="semibold">
                    {projects} проектах
                  </Text>
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiStar} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
                <Text as="span">
                  Получил{" "}
                  <Text as="span" fontWeight="semibold">
                    {reviews} звёзд на проектах
                  </Text>
                </Text>
              </HStack>
            </>
          )}
          {isArticlesMode && (
            <>
              <HStack spacing={2}>
                <Icon as={FiFileText} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
                <Text as="span">
                  Написал{" "}
                  <Text as="span" fontWeight="semibold">
                    {projects} статей
                  </Text>
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiStar} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
                <Text as="span">
                  Получил{" "}
                  <Text as="span" fontWeight="semibold">
                    {reviews} звёзд на статьях
                  </Text>
                </Text>
              </HStack>
            </>
          )}
          {isHackathonMode && (
            <>
              <HStack spacing={2}>
                <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
                <Text as="span">
                  Участвовал в{" "}
                  <Text as="span" fontWeight="semibold">
                    {projects} хакатонах и проектных спринтах
                  </Text>
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FiAward} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
                <Text as="span">
                  Брал призовые места в{" "}
                  <Text as="span" fontWeight="semibold">
                    {reviews} хакатонных форматах
                  </Text>
                </Text>
              </HStack>
            </>
          )}
          {!isWeeklyMode && !isArticlesMode && !isProjectsMode && !isHackathonMode && (
            <HStack spacing={2}>
              <Icon as={FiUsers} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
              <Text as="span">
                Участвовал в{" "}
                <Text as="span" fontWeight="semibold">
                  {reviews} коллаборациях
                </Text>
              </Text>
            </HStack>
          )}
        </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatorCard;


