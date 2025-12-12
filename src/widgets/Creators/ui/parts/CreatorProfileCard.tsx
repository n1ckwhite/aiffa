import React from "react";
import { Box, HStack, VStack, Avatar, Heading, Text, Button, useColorModeValue } from "@chakra-ui/react";
import type { Creator } from "../../model/types";

type CreatorProfileCardProps = {
  creator: Creator;
  index?: number;
};

const roleLabelMap: Record<Creator["role"], string> = {
  author: "Автор материалов",
  mentor: "Ментор",
  reviewer: "Ревьюер",
  maintainer: "Мейнтейнер",
};

const CreatorProfileCard: React.FC<CreatorProfileCardProps> = ({ creator, index }) => {
  const { name, role, avatar, description, contributions, profileLinks } = creator;

  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const primaryText = useColorModeValue("gray.900", "white");
  const secondaryText = useColorModeValue("gray.600", "gray.300");
  const sectionTitle = useColorModeValue("gray.500", "gray.400");

  const primaryButtonBg = useColorModeValue("blue.600", "blue.400");
  const primaryButtonHover = useColorModeValue("blue.500", "blue.300");

  const telegramLink = profileLinks.find((link) => link.type === "telegram");

  const medal =
    index === undefined
      ? null
      : index === 1
      ? "🥇"
      : index === 2
      ? "🥈"
      : index === 3
      ? "🥉"
      : "🏅";

  return (
    <Box
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius="2xl"
      p={{ base: 4, md: 5 }}
      bg={cardBg}
      color={primaryText}
    >
      <VStack align="flex-start" spacing={2} mb={4}>
        {index !== undefined && (
          <HStack spacing={2}>
            {medal && (
              <Text as="span" fontSize="lg" aria-hidden="true">
                {medal}
              </Text>
            )}
            <HStack
              px={3}
              py={0.5}
              borderRadius="full"
              borderWidth="1px"
              borderColor="whiteAlpha.300"
              spacing={1}
            >
              <Text as="span" fontSize="xs" color={secondaryText}>
                #{index}
              </Text>
            </HStack>
          </HStack>
        )}
        <HStack spacing={4} align="center">
          <Avatar size="lg" name={name} src={avatar} />
          <VStack align="flex-start" spacing={1}>
            <Heading as="h3" size="md" letterSpacing="-0.03em">
              {name}
            </Heading>
            <HStack spacing={2} fontSize="sm" color={secondaryText}>
              <Text as="span">{roleLabelMap[role]}</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
      <Button
        size="sm"
        borderRadius="full"
        mt={1}
        mb={4}
        bg={primaryButtonBg}
        color="white"
        _hover={{ bg: primaryButtonHover }}
      >
        Профиль
      </Button>

      <VStack align="flex-start" spacing={3}>
        <Box>
          <Text as="h4" fontSize="sm" fontWeight="medium" color={sectionTitle} mb={1}>
            Bio
          </Text>
          <Text fontSize="sm" color={primaryText} lineHeight={1.8}>
            {description}
          </Text>
        </Box>

        <Box>
          <Text as="h4" fontSize="sm" fontWeight="medium" color={sectionTitle} mb={1}>
            Вклад
          </Text>
          <Text fontSize="sm" color={secondaryText}>
            Материалов:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {contributions.lessons}
            </Text>
            , задач недели:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {contributions.weeklyTasks}
            </Text>
            , проектов:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {contributions.projects}
            </Text>
            , ревью:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {contributions.reviews}
            </Text>
            .
          </Text>
        </Box>

        {telegramLink && (
          <Box>
            <Text as="h4" fontSize="sm" fontWeight="medium" color={sectionTitle} mb={1}>
              Контакты
            </Text>
            <Text fontSize="sm" color={secondaryText}>
              Telegram:{" "}
              <Text as="span" color={primaryText}>
                {telegramLink.label}
              </Text>
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CreatorProfileCard;


