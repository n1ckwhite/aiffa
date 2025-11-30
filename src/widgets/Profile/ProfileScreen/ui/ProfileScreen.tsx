import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { useUserProfile } from 'entities/user';
import ProfileHeader from '../../Header/ui/Header';
import GitHubConnect from '../../GitHubConnect/ui/GitHubConnect';
import XPCard from '../../XPCard/ui/XPCard';
import StudyCard from '../../StudyCard/ui/StudyCard';
import EditModal from '../../EditModal/ui/EditModal';
import AchievementsSection from '../../AchievementsSection/ui/AchievementsSection';
import { useTierMeta } from '../../hooks/useTierMeta';
import { useStudyProgress } from '../../hooks/useStudyProgress';
import { useXpBursts } from '../../hooks/useXpBursts';
import { useProfileScreenColors } from '../colors/useProfileScreenColors';
import { useProfileEditing } from '../hooks/useProfileEditing';
import { useAchievementsData } from '../hooks/useAchievementsData';

const ProfileScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const {
    resetHoverBg, resetActiveBg, resetHoverBgDark, resetActiveBgDark, resetColor,
    ringTrack, ringColor, dividerColor, hintColor, skeletonBg, skeletonRingBorder, skeletonRingTop
  } = useProfileScreenColors();
  const {
    isOpen, onOpenEdit, onClose,
    name, bio, githubUrl, setEditGithubUrl, editName, editBio, editGithubUrl, setEditName, setEditBio,
    isImporting, importFromGithub, onSaveModal, onReset, githubUsername
  } = useProfileEditing();

  const xp = typeof (profile as any).xp === 'number' && isFinite((profile as any).xp) ? Math.max(0, (profile as any).xp) : 0;
  const { tier, tierMeta, nextTierMeta, tierProgressPct } = useTierMeta(xp);
  const xpBursts = useXpBursts(xp, tierProgressPct);
  const { isManifestLoaded, studyProgressPct } = useStudyProgress(profile);
  const { items } = useAchievementsData(profile as any);

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
      <Box maxW={{ base: '100%', md: '900px', lg: '1100px' }} mx="auto">
        <Heading
          as="h1"
          id="profile-page-title"
          size="lg"
          mb={6}
          textAlign="center"
        >
          Профиль
        </Heading>
        <Box>
          <VStack align="center" spacing={4}>
            <ProfileHeader
              name={name}
              bio={bio}
              avatarUrl={(profile as any).avatarUrl || undefined}
              onOpenEdit={onOpenEdit}
              onReset={onReset}
              resetColor={resetColor}
              resetHoverBg={resetHoverBg}
              resetActiveBg={resetActiveBg}
              resetHoverBgDark={resetHoverBgDark}
              resetActiveBgDark={resetActiveBgDark}
            />

            <GitHubConnect
              value={editGithubUrl}
              onChange={setEditGithubUrl}
              onImport={importFromGithub}
              isImporting={isImporting}
              profileName={name}
              avatarUrl={(profile as any).avatarUrl || undefined}
              currentGithubUrl={githubUrl}
              parseUsername={() => (githubUsername)}
              dividerColor={dividerColor}
              hintColor={hintColor}
            />

            <Box w="100%" maxW="900px" mt={4}>
              <VStack align="stretch" spacing={4}>
                <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 4, md: 5 }} alignItems="stretch">
                  <XPCard
                    xp={xp}
                    tier={tier}
                    tierBadge={tierMeta as any}
                    nextTierBadge={nextTierMeta as any}
                    progressPct={tierProgressPct}
                    xpBursts={xpBursts}
                    dividerColor={dividerColor}
                    hintColor={hintColor}
                  />

                  <StudyCard
                    isManifestLoaded={isManifestLoaded}
                    studyProgressPct={studyProgressPct}
                    ringTrack={ringTrack}
                    ringColor={ringColor}
                    skeletonBg={skeletonBg}
                    skeletonRingBorder={skeletonRingBorder}
                    skeletonRingTop={skeletonRingTop}
                    dividerColor={dividerColor}
                    hintColor={hintColor}
                  />
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>

      <Box maxW="900px" mx="auto">
        <Box>
          <AchievementsSection items={items} skeletonBg={skeletonBg} />
        </Box>
      </Box>

      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        editName={editName}
        editBio={editBio}
        setEditName={setEditName}
        setEditBio={setEditBio}
        onSave={onSaveModal}
        resetColor={resetColor}
        resetHoverBg={resetHoverBg}
        resetActiveBg={resetActiveBg}
        resetHoverBgDark={resetHoverBgDark}
        resetActiveBgDark={resetActiveBgDark}
      />
    </Box>
  );
};

export default ProfileScreen;


