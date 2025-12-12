import React from "react";
import { Box, HStack, VStack, Text, Avatar, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  FiBookOpen,
  FiTarget,
  FiCheckCircle,
  FiAward,
  FiArrowRight,
  FiShield,
  FiFileText,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Creator } from "../../model/types";

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
  const { name, role, avatar, direction, contributions } = creator;
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
  const linkColor = useColorModeValue("blue.600", "blue.300");
  const linkHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");
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
  const bgIconColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

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

  return (
    <Box
      borderWidth={isTop3 ? "2px" : "1px"}
      borderColor={isTop3 ? rankBorder : cardBorder}
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      w="full"
      bg={cardBg}
      position="relative"
      overflow="hidden"
      role="group"
      transition="background-color 0.18s ease-out, box-shadow 0.2s ease-out, transform 0.16s ease-out, border-color 0.16s ease-out"
      _hover={{
        bg: cardHoverBg,
        boxShadow: isTop3 ? cardShadow : "0 6px 18px rgba(15,23,42,0.06)",
        transform: isTop3 ? "translateY(-3px)" : "translateY(-1px)",
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
          as={RoleIcon}
          boxSize={28}
          color={bgIconColor}
          position="absolute"
          right={-2}
          bottom={-4}
          transform="rotate(-8deg) translate3d(0, 0, 0)"
          opacity={0.12}
          transition="transform 0.25s ease-out, opacity 0.25s ease-out"
          _groupHover={{
            transform: "rotate(-2deg) translate3d(10px, -8px, 0)",
            opacity: 0.2,
          }}
          aria-hidden="true"
        />
      </Box>
      <Box position="relative">
        <HStack justify="space-between" align="center" mb={2}>
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
        </HStack>

        <HStack align="center" spacing={3} mb={2}>
          <Box
            position="relative"
            transition="transform 0.18s ease-out"
            _groupHover={{ transform: "translateY(-2px)" }}
          >
            <Box
              position="absolute"
              inset={-1}
              borderRadius="full"
              borderWidth="2px"
              borderColor={avatarBg}
              opacity={0.9}
            />
            <Avatar
              size="sm"
              name={name}
              src={avatar}
              position="relative"
              bg={avatarBg}
              color="white"
            />
          </Box>
          <VStack align="flex-start" spacing={0.5}>
            <Text fontSize="lg" fontWeight="semibold" letterSpacing="-0.02em" color={primaryTextColor}>
              {name}
            </Text>
            <HStack spacing={1}>
              <Box
                as="span"
                px={2}
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
                <Icon as={RoleIcon} boxSize={3} aria-hidden="true" />
                <Text as="span">{direction || roleLabelMap[role]}</Text>
              </Box>
            </HStack>
          </VStack>
        </HStack>

        <HStack spacing={2} fontSize="xs" color={metaColor} mb={2} flexWrap="wrap">
          <HStack spacing={1}>
            <Icon as={FiBookOpen} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
            <Text as="span">
              {lessons}{" "}
              <Text as="span" fontWeight="semibold">
                материалов
              </Text>
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
            <Text as="span">
              {weeklyTasks}{" "}
              <Text as="span" fontWeight="semibold">
                задач
              </Text>
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FiCheckCircle} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
            <Text as="span">
              {reviews}{" "}
              <Text as="span" fontWeight="semibold">
                ревью
              </Text>
            </Text>
          </HStack>
        </HStack>

        <HStack justify="flex-start">
          <Button
            size="xs"
            borderRadius="full"
            variant="ghost"
            color={linkColor}
            mt={0.5}
            onClick={onOpenProfile}
            rightIcon={<FiArrowRight />}
            px={2}
            _hover={{ bg: linkHoverBg, transform: "translateX(2px)" }}
            _active={{ transform: "translateX(1px)" }}
          >
            Перейти
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default CreatorCard;


