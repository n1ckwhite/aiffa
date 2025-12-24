import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { useAvatarPalette } from "../hooks/useAvatarPalette";
import { useCreatorCardColors } from "../colors/useCreatorCardColors";
import type { CreatorCardProps } from "../types";
import CreatorCardHeader from "./CreatorCardHeader/CreatorCardHeader";
import CreatorCardProfile from "./CreatorCardProfile/CreatorCardProfile";
import CreatorCardDescription from "./CreatorCardDescription/CreatorCardDescription";
import CreatorCardMeta from "./CreatorCardMeta/CreatorCardMeta";
import { buildMetaByMode } from "../data/metaByMode";
import { useCardComputed } from "../helpers/useCardComputed";

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, index, mode = "materials", showRank = true }) => {
  const { name, role, avatar, direction, contributions, profileLinks } = creator;
  const { lessons, weeklyTasks, reviews, projects } = contributions;

  const { avatarIndex } = useAvatarPalette(name);
  const {
    accentColor,
    pillBorderColor,
    pillHoverBg,
    rankBg,
    metaColor,
    materialsIconColor,
    tasksIconColor,
    reviewsIconColor,
    linkColor,
    cardBgMaterials,
    cardBgWeekly,
    roleColor,
    roleBg,
    roleBorder,
    primaryTextColor,
    bgIconColor,
    avatarBg,
    rankPalette,
  } = useCreatorCardColors({ role, avatarIndex });

  const { rankBorder, rankColor, DirectionIcon, isTop3, cardHref, descriptionText, cardBg, rootProps } = useCardComputed({
    creator,
    index,
    mode,
    showRank,
    rankPalette,
    cardBgMaterials,
    cardBgWeekly,
  });

  const metaByMode = buildMetaByMode({
    lessons,
    weeklyTasks,
    projects,
    reviews,
    materialsIconColor,
    tasksIconColor,
    reviewsIconColor,
  });

  return (
    <Box
      {...rootProps}
      borderRadius="2xl"
      p={{ base: 3, md: 4 }}
      w="full"
      minW={{ base: "100%", md: "320px" }}
      maxW="100%"
      boxSizing="border-box"
      flexShrink={0}
      bg={cardBg}
      boxShadow="sm"
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
        boxShadow: "md",
        borderColor: accentColor,
        transform: "translateY(-1px)",
      }}
    >
      <Box position="absolute" inset={0} pointerEvents="none" overflow="hidden">
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
          <CreatorCardHeader isTop3={isTop3} index={index} rankBorder={rankBorder} rankBg={rankBg} rankColor={rankColor} cardHref={cardHref} linkColor={linkColor} />

          <CreatorCardProfile
            name={name}
            avatar={avatar}
            avatarBg={avatarBg}
            primaryTextColor={primaryTextColor}
            roleBorder={roleBorder}
            roleBg={roleBg}
            roleColor={roleColor}
            DirectionIcon={DirectionIcon}
            role={role}
            direction={direction}
          />

          <Box w="full">
            <CreatorCardDescription description={descriptionText} color={primaryTextColor} />
          </Box>

          <CreatorCardMeta metaByMode={metaByMode} mode={mode} metaColor={metaColor} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreatorCard;


