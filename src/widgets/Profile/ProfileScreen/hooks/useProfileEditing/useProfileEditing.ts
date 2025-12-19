import React from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useUserProfile } from 'entities/user';
import { GH_PREFIX, parseGithubUsername } from '../useGithubHelpers';
import { normalizeText } from './helpers/normalize';
import { importGithubProfile } from './helpers/github';
import { DEFAULT_PROFILE, RESET_TOAST_ID, type ProfileDraft } from './types';

export const useProfileEditing = () => {
  const { profile, updateProfile } = useUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const currentGithubUrl = (profile as any).githubUrl || '';
  const githubUsername = (profile as any).githubUsername || parseGithubUsername(currentGithubUrl);

  const [draft, setDraft] = React.useState<ProfileDraft>({
    name: profile.name,
    bio: profile.bio,
  });
  const [githubUrlInput, setGithubUrlInput] = React.useState<string>(currentGithubUrl || GH_PREFIX);
  const [isImporting, setIsImporting] = React.useState(false);

  // Держим draft в синхронизации с профилем, но не затираем ввод во время открытой модалки.
  React.useEffect(() => {
    if (isOpen) return;
    setDraft({ name: profile.name, bio: profile.bio });
    setGithubUrlInput(currentGithubUrl || GH_PREFIX);
  }, [isOpen, profile.name, profile.bio, currentGithubUrl]);

  const handleDraftNameChange = React.useCallback((value: string) => {
    setDraft((prev) => ({ ...prev, name: value }));
  }, []);

  const handleDraftBioChange = React.useCallback((value: string) => {
    setDraft((prev) => ({ ...prev, bio: value }));
  }, []);

  const handleOpenEdit = React.useCallback(() => {
    setDraft({ name: profile.name, bio: profile.bio });
    onOpen();
  }, [profile.name, profile.bio, onOpen]);

  const handleSave = React.useCallback(() => {
    const nextName = normalizeText(draft.name, DEFAULT_PROFILE.name);
    const nextBio = normalizeText(draft.bio, DEFAULT_PROFILE.bio);

    updateProfile({ name: nextName, bio: nextBio });
    onClose();
  }, [draft.name, draft.bio, updateProfile, onClose]);

  const handleReset = React.useCallback(() => {
    updateProfile({
      name: DEFAULT_PROFILE.name,
      bio: DEFAULT_PROFILE.bio,
      githubUrl: '',
      githubUsername: '',
      avatarUrl: '',
    });

    toast({
      id: RESET_TOAST_ID,
      title: 'Имя и описание сброшены',
      status: 'info',
      duration: 1800,
      isClosable: true,
      position: 'bottom',
    });

    setDraft(DEFAULT_PROFILE);
    setGithubUrlInput(GH_PREFIX);
  }, [toast, updateProfile]);

  const handleImportFromGithub = React.useCallback(async () => {
    try {
      setIsImporting(true);
      const imported = await importGithubProfile(githubUrlInput);
      if (!imported) return;

      updateProfile({
        name: imported.name,
        bio: imported.bio,
        avatarUrl: imported.avatarUrl,
        githubUrl: imported.githubUrl,
        githubUsername: imported.githubUsername,
      });

      setGithubUrlInput(imported.githubUrl);
      if (isOpen) setDraft({ name: imported.name, bio: imported.bio });
    } catch(error) {
      console.error(error);

      toast({
        id: 'profile-import-from-github-error',
        title: 'Не удалось импортировать с GitHub',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      setIsImporting(false);
    }
  }, [githubUrlInput, updateProfile, isOpen, toast]);

  return {
    // disclosure
    isOpen,
    onOpenEdit: handleOpenEdit,
    onClose,
    // basic fields
    name: profile.name,
    bio: profile.bio,
    githubUrl: currentGithubUrl,
    // gh helpers
    GH_PREFIX,
    githubUsername,
    isImporting,
    importFromGithub: handleImportFromGithub,
    editGithubUrl: githubUrlInput,
    setEditGithubUrl: setGithubUrlInput,
    // actions
    editName: draft.name,
    editBio: draft.bio,
    setEditName: handleDraftNameChange,
    setEditBio: handleDraftBioChange,
    onSaveModal: handleSave,
    onReset: handleReset,
  };
};


