import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useUserProfile } from "entities/user";
import { useAchievementsData } from "../hooks/useAchievementsData";
import { ProfileRightColumn, ProfileSidebar } from "./parts";
import { useProfileEdit, useProfilePeopleQuery, useProfileScreenViewModel } from "../model/hooks";

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const { items } = useAchievementsData(profile as any);
  const vm = useProfileScreenViewModel({ profile, achievementItems: items });

  const {
    isEditing,
    editSessionId,
    editInitial,
    isSaving,
    hasTriedSave,
    saveAction,
    handleStartEdit,
    handleCancelEdit,
    handleStopHotkeys,
  } = useProfileEdit({
    profile,
    displayLinks: vm.displayLinks,
    emailValue: vm.emailValue,
    updateProfile,
  });

  const { mode: peopleMode } = useProfilePeopleQuery();

  return (
    <Box
      as="main"
      role="main"
      position="relative"
      overflow="hidden"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
      aria-labelledby="profile-page-title"
    >
      <Box maxW={{ base: "100%", md: "1000px", lg: "1180px" }} mx="auto">
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(320px, 340px) 1fr" }}
          gap={4}
          alignItems={{ base: "start", lg: "stretch" }}
        >
          <GridItem>
            <Box
              py={{base: 0, lg: 7}}
              h={{ base: "auto", lg: "full" }}
            >
              <ProfileSidebar
                avatarUrl={vm.avatarUrl}
                name={vm.name}
                bio={vm.bio}
                xp={vm.xp}
                followersCount={vm.followersCount}
                followingCount={vm.followingCount}
                profileBadge={vm.profileBadge}
                workplace={vm.workplace}
                locationLabel={vm.locationLabel}
                emailValue={vm.emailValue}
                displayLinks={vm.displayLinks}
                isEditing={isEditing}
                editSessionId={editSessionId}
                hasTriedSave={hasTriedSave}
                editInitial={editInitial}
                saveAction={saveAction}
                isSaving={isSaving}
                handleStartEdit={handleStartEdit}
                handleCancelEdit={handleCancelEdit}
                handleStopHotkeys={handleStopHotkeys}
                achievedItems={vm.achievedItems}
              />
            </Box>
          </GridItem>

          <GridItem minW={0}>
            <ProfileRightColumn mode={peopleMode} achievementItems={items as any} />
          </GridItem>
        </Grid>
      </Box>

    </Box>
  );
};

export default ProfileScreen;


