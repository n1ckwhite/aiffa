import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import type { ProfileSidebarProps } from "./types";
import { ProfileHeader } from "./parts/ProfileHeader";
import { ContactsSection } from "./parts/ContactsSection";
import { LinksSection } from "./parts/LinksSection";
import { EditActionsRow } from "./parts/EditActionsRow";
import { AchievementsSection } from "./parts/AchievementsSection";

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  avatarUrl,
  name,
  bio,
  xp,
  followersCount,
  followingCount,
  profileBadge,
  workplace,
  locationLabel,
  emailValue,
  displayLinks,
  isEditing,
  editSessionId,
  hasTriedSave,
  editInitial,
  saveAction,
  isSaving,
  handleStartEdit,
  handleCancelEdit,
  handleStopHotkeys,
  achievedItems,
}) => {
  let headerEditInitial: { name: string; bio: string } | null = null;
  let contactsEditInitial: { workplace: string; location: string } | null = null;
  let linksEditInitial: { links: [string, string, string, string] } | null = null;
  if (editInitial) {
    headerEditInitial = { name: editInitial.name, bio: editInitial.bio };
    contactsEditInitial = { workplace: editInitial.workplace, location: editInitial.location };
    linksEditInitial = { links: editInitial.links };
  }

  return (
    <Grid
      as="aside"
      aria-label="Панель профиля"
      w="full"
      templateColumns={{
        base: "1fr",
        md: "1fr 1fr",
        lg: "1fr",
      }}
      columnGap={{ base: 0, md: 10, lg: 0 }}
      rowGap={{ base: 4, md: 0, lg: 4 }}
      alignItems="start"
    >
      <GridItem>
        <ProfileHeader
          avatarUrl={avatarUrl}
          name={name}
          bio={bio}
          xp={xp}
          followersCount={followersCount}
          followingCount={followingCount}
          profileBadge={profileBadge}
          isEditing={isEditing}
          editSessionId={editSessionId}
          editInitial={headerEditInitial}
          saveAction={saveAction}
          handleStopHotkeys={handleStopHotkeys}
          handleStartEdit={handleStartEdit}
        />
      </GridItem>

      <GridItem minW={0}>
        <Box w="full" maxW={{ base: "360px", md: "full", lg: "full" }} mx={{ base: "auto", md: 0, lg: 0 }}>
          <ContactsSection
            isEditing={isEditing}
            workplace={workplace}
            locationLabel={locationLabel}
            emailValue={emailValue}
            editInitial={contactsEditInitial}
            handleStopHotkeys={handleStopHotkeys}
          />

          <LinksSection
            isEditing={isEditing}
            hasTriedSave={hasTriedSave}
            displayLinks={displayLinks}
            editInitial={linksEditInitial}
            handleStopHotkeys={handleStopHotkeys}
          />

          <EditActionsRow
            isEditing={isEditing}
            isSaving={isSaving}
            onCancel={handleCancelEdit}
          />

          <AchievementsSection achievedItems={achievedItems} />
        </Box>
      </GridItem>
    </Grid>
  );
};


