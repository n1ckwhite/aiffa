import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { gratitudeMessagesByMode } from "../data/gratitudeMessages";
import { roleIconMap } from "../data/roles";
import { getDirectionIcon } from "../functions/getDirectionIcon";
import { useAvatarPalette } from "../hooks/useAvatarPalette";
import { useCreatorCardColors } from "../colors/useCreatorCardColors";
import type { CreatorCardMode, CreatorCardProps } from "../types";
import CreatorCardHeader from "./CreatorCardHeader/CreatorCardHeader";
import CreatorCardProfile from "./CreatorCardProfile/CreatorCardProfile";
import CreatorCardDescription from "./CreatorCardDescription/CreatorCardDescription";
import CreatorCardMeta from "./CreatorCardMeta/CreatorCardMeta";
import { buildMetaByMode } from "../data/metaByMode";

const getDescription = (mode: CreatorCardMode, index: number) => {
  const messages = gratitudeMessagesByMode[mode];
  return messages[index - 1] ?? messages[messages.length - 1];
};

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, index, mode = "materials", showRank = true }) => {
  const { name, role, avatar, direction, contributions, profileLinks } = creator;
  const { lessons, weeklyTasks, reviews, projects } = contributions;

  const isWeeklyMode = mode === "weekly";
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

  const rankBorder =
    index === 1 ? rankPalette[1].border : index === 2 ? rankPalette[2].border : index === 3 ? rankPalette[3].border : rankPalette.default.border;
  const rankColor =
    index === 1 ? rankPalette[1].color : index === 2 ? rankPalette[2].color : index === 3 ? rankPalette[3].color : rankPalette.default.color;

  const roleIcon = roleIconMap[role];
  const DirectionIcon = React.useMemo<IconType>(() => getDirectionIcon(direction, roleIcon), [direction, roleIcon]);

  const isTop3 = index <= 3 && showRank;
  const cardHref = profileLinks[0]?.href;
  const descriptionText = getDescription(mode, index);
  const rootProps = cardHref
    ? ({
        as: "a",
        href: cardHref,
        target: "_blank",
        rel: "noopener noreferrer",
      } as const)
    : ({ as: "div" } as const);

  const cardBg = isWeeklyMode ? cardBgWeekly : cardBgMaterials;

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


