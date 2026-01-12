import React from "react";
import { VStack } from "@chakra-ui/react";
import type { ProfileHeaderProps } from "./types";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";
import { useProfilePeopleQuery } from "../../../../../model/hooks";

import { useProfileHeaderPeopleLinks } from "./model/hooks/useProfileHeaderPeopleLinks";
import { getCountToShow } from "./model/helpers/counts";
import { ProfileHeaderAvatar, ProfileHeaderEditForm, ProfileHeaderViewInfo, ProfileHeaderPeopleLinks, ProfileHeaderXpBadgeRow } from "./parts";

export const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const {
    avatarUrl,
    name,
    bio,
    xp,
    followersCount,
    followingCount,
    profileBadge,
    isEditing,
    editSessionId,
    editInitial,
    saveAction,
    handleStopHotkeys,
    handleStartEdit,
  } = props;
  const {
    muted,
    xpNumberColor,
    linkTextColor,
    primaryBtnBg,
    primaryBtnHoverBg,
    primaryBtnActiveBg,
    formBorder,
    formBg,
    leftIconColors,
  } = useProfileScreenUiColors();
  const { mode } = useProfilePeopleQuery();

  const displayName = name || "Пользователь";
  const displayBio = bio || "Описание";

  const initialName = editInitial?.name ?? "";
  const initialBio = editInitial?.bio ?? "";

  const followersCountToShow = getCountToShow({ mode: "followers", count: followersCount });
  const followingCountToShow = getCountToShow({ mode: "following", count: followingCount });

  const { followersLinkProps, followingLinkProps } = useProfileHeaderPeopleLinks({
    activeMode: mode,
    followersCount: followersCountToShow,
    followingCount: followingCountToShow,
  });

  return (
    <VStack
      align={{ base: "center", md: "start" }}
      spacing={3}
      w="full"
      minW={0}
      textAlign={{ base: "center", md: "left" }}
    >
      <ProfileHeaderAvatar avatarUrl={avatarUrl} displayName={displayName} />

      <VStack align={{ base: "center", md: "start" }} spacing={2} w="full" minW={0}>
        {isEditing ? (
          <ProfileHeaderEditForm
            editSessionId={editSessionId}
            saveAction={saveAction}
            initialName={initialName}
            initialBio={initialBio}
            formBorder={formBorder}
            formBg={formBg}
            handleStopHotkeys={handleStopHotkeys}
          />
        ) : (
          <ProfileHeaderViewInfo
            displayName={displayName}
            displayBio={displayBio}
            mutedColor={muted}
            primaryBtnBg={primaryBtnBg}
            primaryBtnHoverBg={primaryBtnHoverBg}
            primaryBtnActiveBg={primaryBtnActiveBg}
            onStartEdit={handleStartEdit}
          />
        )}

        <VStack spacing={2} w="full" pt={1} align={{ base: "center", md: "start" }}>
          <ProfileHeaderPeopleLinks
            followersLinkProps={followersLinkProps}
            followingLinkProps={followingLinkProps}
            hoverColor={linkTextColor}
            mutedColor={muted}
          />

          <ProfileHeaderXpBadgeRow
            xp={xp}
            profileBadge={profileBadge}
            mutedColor={muted}
            xpNumberColor={xpNumberColor}
            xpIconColor={leftIconColors.xp}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};


