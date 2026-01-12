import React from "react";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { PeopleListItem } from "../../../../types";
import { useProfileScreenUiColors } from "../../../../../../../colors/useProfileScreenUiColors";
import PillBadge from "shared/ui/PillBadge";
import { AppLink } from "shared/ui/AppLink";
import { FollowIconButton } from "./FollowIconButton";

export type PeopleListRowProps = {
  item: PeopleListItem;
  isFollowing: boolean;
  onToggleFollow: (userId: string) => void;
};

export const PeopleListRow: React.FC<PeopleListRowProps> = ({ item, isFollowing, onToggleFollow }) => {
  const { muted, textStrong, linkTextColor } = useProfileScreenUiColors();

  let descriptionBlock: React.ReactNode = null;
  if (item.description) {
    descriptionBlock = (
      <Text color={muted} fontSize="sm" noOfLines={1}>
        {item.description}
      </Text>
    );
  }

  let badgeBlock: React.ReactNode = null;
  if (item.badge) {
    badgeBlock = (
      <PillBadge colorScheme={item.badge.colorScheme as any} variant="outline" uppercase={false}>
        {item.badge.label}
      </PillBadge>
    );
  }

  const handleToggle = () => {
    onToggleFollow(item.id);
  };

  const profileHref = "/profile";

  const nameBlock = (
    <AppLink
      to={profileHref}
      aria-label={`Открыть профиль пользователя ${item.name}`}
      color={textStrong}
      fontWeight="semibold"
      _hover={{ color: linkTextColor, textDecoration: "underline" }}
      _focusVisible={{ boxShadow: "none", outline: "2px solid", outlineColor: linkTextColor, outlineOffset: "2px" }}
    >
      {item.name}
    </AppLink>
  );

  return (
    <Box
      as="li"
      bg="transparent"
      px={{ base: 3, md: 4 }}
      py={{ base: 3, md: 3.5 }}
      listStyleType="none"
    >
      <HStack spacing={4} align="flex-start" justify="space-between">
        <Avatar name={item.name} src={item.avatarUrl} boxSize="56px" />
        <HStack spacing={3} align="flex-start" minW={0} flex={1}>
          <VStack align="start" spacing={0} minW={0} flex={1}>
            <HStack spacing={2} align="center" minW={0} flexWrap="wrap">
              {nameBlock}
              {badgeBlock}
            </HStack>
            <Text color={muted} fontSize="sm" noOfLines={1}>
              @{item.username}
            </Text>
            {descriptionBlock}
          </VStack>
          <FollowIconButton isFollowing={isFollowing} onToggle={handleToggle} />
        </HStack>
      </HStack>
    </Box>
  );
};


