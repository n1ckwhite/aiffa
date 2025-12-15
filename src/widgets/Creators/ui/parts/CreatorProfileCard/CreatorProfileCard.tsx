import React from "react";
import { Avatar, Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { roleLabelMap } from "./data/roleLabelMap";
import { getMedal } from "./helpers/getMedal";
import { useCreatorProfileCardColors } from "./colors/useCreatorProfileCardColors";
import type { CreatorProfileCardProps } from "./types";
import type { CreatorProfileLink } from "@/widgets/Creators/model/types";

const CreatorProfileCard: React.FC<CreatorProfileCardProps> = ({ creator, index }) => {
  const { name, role, avatar, title, contributions, profileLinks } = creator;
  const { lessons, weeklyTasks, projects, reviews } = contributions;

  const { cardBg, cardBorder, primaryText, secondaryText, sectionTitle, primaryButtonBg, primaryButtonHover } = useCreatorProfileCardColors();

  const telegramLink = profileLinks.find((link: CreatorProfileLink) => link.type === "telegram");
  const medal = getMedal(index);

  return (
    <Box borderWidth="1px" borderColor={cardBorder} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg} color={primaryText}>
      <VStack align="flex-start" spacing={2} mb={4}>
        {index !== undefined && (
          <HStack spacing={2}>
            {medal && (
              <Text as="span" fontSize="lg" aria-hidden="true">
                {medal}
              </Text>
            )}
            <HStack px={3} py={0.5} borderRadius="full" borderWidth="1px" borderColor="whiteAlpha.300" spacing={1}>
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
            {title}
          </Text>
        </Box>

        <Box>
          <Text as="h4" fontSize="sm" fontWeight="medium" color={sectionTitle} mb={1}>
            Вклад
          </Text>
          <Text fontSize="sm" color={secondaryText}>
            Материалов:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {lessons}
            </Text>
            , задач недели:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {weeklyTasks}
            </Text>
            , проектов:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {projects}
            </Text>
            , коллабораций:{" "}
            <Text as="span" color={primaryText} fontWeight="semibold">
              {reviews}
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


