import React from "react";
import { Box, HStack, VStack, Text, Avatar, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  FiBookOpen,
  FiTarget,
  FiUsers,
  FiAward,
  FiStar,
  FiExternalLink,
  FiShield,
  FiFileText,
  FiUser,
  FiUserCheck,
  FiMonitor,
  FiServer,
  FiCpu,
  FiCloud,
  FiLayers,
} from "react-icons/fi";
import { FaTelegramPlane, FaGithub, FaGlobe, FaTwitter } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { Creator, CreatorProfileLink } from "../../model/types";

type CreatorCardProps = {
  creator: Creator;
  index: number;
  onOpenProfile?: () => void;
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

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, index, onOpenProfile }) => {
  const { name, role, avatar, direction, contributions, title, profileLinks } = creator;
  const { lessons, weeklyTasks, reviews } = contributions;

  const cardBg = useColorModeValue("white", "whiteAlpha.50");
  const cardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const goldBorder = useColorModeValue("yellow.400", "yellow.300");
  const goldColor = useColorModeValue("yellow.700", "yellow.200");

  const silverBorder = useColorModeValue("purple.400", "purple.300");
  const silverColor = useColorModeValue("purple.700", "purple.200");

  const bronzeBorder = useColorModeValue("orange.400", "orange.300");
  const bronzeColor = useColorModeValue("orange.700", "orange.200");

  const defaultBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const defaultColor = useColorModeValue("gray.500", "gray.300");

  const rankBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");
  const rankBorder =
    index === 1 ? goldBorder : index === 2 ? silverBorder : index === 3 ? bronzeBorder : defaultBorder;
  const rankColor =
    index === 1 ? goldColor : index === 2 ? silverColor : index === 3 ? bronzeColor : defaultColor;
  const metaColor = useColorModeValue("gray.500", "gray.300");
  const materialsIconColor = useColorModeValue("orange.400", "orange.300");
  const tasksIconColor = useColorModeValue("blue.400", "blue.300");
  const reviewsIconColor = useColorModeValue("green.500", "green.300");
  const linkColor = useColorModeValue("blue.600", "blue.200");
  const linkHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const top1BgGradient = useColorModeValue(
    "linear(to-br, rgba(253,224,71,0.26), rgba(250,250,249,0.9))",
    "linear(to-br, rgba(202,138,4,0.45), rgba(23,23,23,0.92))",
  );
  const top2BgGradient = useColorModeValue(
    "linear(to-br, rgba(196,181,253,0.22), rgba(248,250,252,0.9))",
    "linear(to-br, rgba(109,40,217,0.4), rgba(23,23,23,0.92))",
  );
  const top3BgGradient = useColorModeValue(
    "linear(to-br, rgba(251,146,60,0.20), rgba(248,250,252,0.9))",
    "linear(to-br, rgba(234,88,12,0.4), rgba(23,23,23,0.92))",
  );
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
  const cardHoverBg = useColorModeValue("white", "whiteAlpha.100");
  const cardShadow = useColorModeValue(
    "0 10px 30px rgba(15,23,42,0.10)",
    "0 14px 40px rgba(0,0,0,0.65)",
  );
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
  const isTop3 = index <= 3;
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

  const getProfileIcon = (type: CreatorProfileLink["type"]): IconType => {
    if (type === "telegram") return FaTelegramPlane;
    if (type === "github") return FaGithub;
    if (type === "x") return FaTwitter;
    return FaGlobe;
  };

  const topRankIcon: IconType | null = isTop1 ? FiAward : isTop2 ? FiStar : isTop3Only ? FiUsers : null;
  const cardHref = profileLinks[0]?.href;

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
      borderWidth={isTop1 ? "2.5px" : isTop3 ? "2px" : "1px"}
      borderColor={isTop3 ? rankBorder : cardBorder}
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      w="full"
      bg={cardBg}
      bgGradient={
        isTop1 ? top1BgGradient : isTop2 ? top2BgGradient : isTop3Only ? top3BgGradient : undefined
      }
      position="relative"
      overflow="hidden"
      role="group"
      cursor={cardHref ? "pointer" : "default"}
      aria-label={cardHref ? `Открыть ссылку автора ${name}` : undefined}
      transition="background-color 0.18s ease-out, box-shadow 0.2s ease-out, transform 0.16s ease-out, border-color 0.16s ease-out"
      _hover={{
        boxShadow: isTop1
          ? "0 22px 60px rgba(202,138,4,0.45)"
          : isTop2
          ? "0 18px 50px rgba(88,28,135,0.45)"
          : isTop3Only
          ? "0 16px 40px rgba(194,65,12,0.40)"
          : "0 6px 18px rgba(15,23,42,0.06)",
        transform: isTop1
          ? "translateY(-6px)"
          : isTop2
          ? "translateY(-4px)"
          : isTop3
          ? "translateY(-3px)"
          : "translateY(-1px)",
        borderColor: isTop3 ? rankBorder : cardBorder,
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
      <Box position="relative">
        <HStack justify="space-between" align="center" mb={2} spacing={2}>
          <HStack spacing={2}>
            <Icon as={FiAward} boxSize={4} color={rankColor} aria-hidden="true" />
            <HStack
              px={3}
              py={0.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor={rankBorder}
              bg={rankBg}
              spacing={1}
            >
              <Text as="span" fontSize="xs" color={rankColor}>
                #{index}
              </Text>
            </HStack>
          </HStack>
          {cardHref && (
            <Icon
              as={FiExternalLink}
              boxSize={3.5}
              aria-hidden="true"
              color={linkColor}
            />
          )}
        </HStack>
        

        <HStack align="flex-start" spacing={3} mt={2} mb={4}>
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
            {title && (
              <Text
                fontSize="xs"
                color={metaColor}
                maxW="full"
                textAlign="left"
                noOfLines={2}
              >
                {title}
              </Text>
            )}
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
          <HStack spacing={2}>
            <Icon as={FiBookOpen} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
            <Text as="span">
              Поделился{" "}
              <Text as="span" fontWeight="semibold">
                {lessons} материалами
              </Text>
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
            <Text as="span">
              Придумал{" "}
              <Text as="span" fontWeight="semibold">
                {weeklyTasks} задач для материала
              </Text>
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={FiUsers} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
            <Text as="span">
              Участвовал в{" "}
              <Text as="span" fontWeight="semibold">
                {reviews} коллаборациях
              </Text>
            </Text>
          </HStack>
        </VStack>

        <Text
          fontSize="xs"
          color={metaColor}
          mt={1}
        >
          Карточка — это приглашение познакомиться и найти точку для совместных проектов.
        </Text>

        {/* нижняя ссылка не нужна — основной CTA выше */}
      </Box>
    </Box>
  );
};

export default CreatorCard;


