import React from "react";
import { Box, HStack, VStack, Text, Avatar, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  FiBookOpen,
  FiTarget,
  FiCheckCircle,
  FiAward,
  FiArrowRight,
  FiZap,
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
  const { name, role, avatar, xp, contributions } = creator;
  const { lessons, weeklyTasks, reviews } = contributions;

  const cardBg = useColorModeValue("white", "whiteAlpha.50");
  const cardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const goldBg = useColorModeValue("yellow.50", "yellow.900");
  const goldBorder = useColorModeValue("yellow.400", "yellow.300");
  const goldColor = useColorModeValue("yellow.700", "yellow.200");

  const silverBg = useColorModeValue("purple.50", "purple.900");
  const silverBorder = useColorModeValue("purple.400", "purple.300");
  const silverColor = useColorModeValue("purple.700", "purple.200");

  const bronzeBg = useColorModeValue("orange.50", "orange.900");
  const bronzeBorder = useColorModeValue("orange.400", "orange.300");
  const bronzeColor = useColorModeValue("orange.700", "orange.200");

  const defaultBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const defaultBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const defaultColor = useColorModeValue("gray.500", "gray.300");

  const rankBg =
    index === 1 ? goldBg : index === 2 ? silverBg : index === 3 ? bronzeBg : defaultBg;
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
  const xpIconColor = useColorModeValue("purple.500", "purple.300");
  const roleColors = {
    author: { light: "orange.500", dark: "orange.300" },
    mentor: { light: "teal.500", dark: "teal.300" },
    reviewer: { light: "purple.500", dark: "purple.300" },
    maintainer: { light: "blue.600", dark: "blue.300" },
  } as const;
  const currentRoleColors = roleColors[role];
  const roleColor = useColorModeValue(currentRoleColors.light, currentRoleColors.dark);
  const RoleIcon = roleIconMap[role];
  const xpBg = useColorModeValue("purple.50", "whiteAlpha.100");
  const xpBorder = useColorModeValue("purple.200", "purple.400");
  const primaryTextColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius="2xl"
      p={{ base: 4, md: 5 }}
      bg={cardBg}
    >
      <HStack justify="space-between" align="center" mb={3}>
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

      <HStack align="center" spacing={4} mb={3}>
        <Avatar size="md" name={name} src={avatar} />
        <VStack align="flex-start" spacing={0.5}>
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="-0.02em" color={primaryTextColor}>
            {name}
          </Text>
          <HStack spacing={1}>
            <Icon as={RoleIcon} boxSize={3.5} aria-hidden="true" color={roleColor} />
            <Text fontSize="sm" color={metaColor}>
              {roleLabelMap[role]}
            </Text>
          </HStack>
        </VStack>
      </HStack>

      <HStack spacing={4} mb={1} fontSize="xs" color={metaColor}>
        <HStack spacing={1}>
          <Icon as={FiZap} boxSize={3.5} aria-hidden="true" color={xpIconColor} />
          <Text as="span">XP</Text>
          <Box
            as="span"
            px={2}
            py={0.5}
            borderRadius="full"
            borderWidth="1px"
            borderColor={xpBorder}
            bg={xpBg}
            fontWeight="semibold"
            color={primaryTextColor}
          >
            {xp.toLocaleString("ru-RU")}
          </Box>
        </HStack>
      </HStack>
      <HStack spacing={3} fontSize="xs" color={metaColor} mb={3} flexWrap="wrap">
        <HStack spacing={1}>
          <Icon as={FiBookOpen} boxSize={3.5} aria-hidden="true" color={materialsIconColor} />
          <Text as="span">
            {lessons} материалов
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={FiTarget} boxSize={3.5} aria-hidden="true" color={tasksIconColor} />
          <Text as="span">
            {weeklyTasks} задач
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={FiCheckCircle} boxSize={3.5} aria-hidden="true" color={reviewsIconColor} />
          <Text as="span">
            {reviews} ревью
          </Text>
        </HStack>
      </HStack>

      <Button
        size="sm"
        borderRadius="full"
        variant="ghost"
        color={linkColor}
        mt={1}
        onClick={onOpenProfile}
        rightIcon={<FiArrowRight />}
        px={2}
        _hover={{ bg: linkHoverBg, transform: "translateX(2px)" }}
        _active={{ transform: "translateX(1px)" }}
      >
        Перейти
      </Button>
    </Box>
  );
};

export default CreatorCard;


