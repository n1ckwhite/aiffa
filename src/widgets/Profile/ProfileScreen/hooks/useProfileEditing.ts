import React from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useUserProfile } from 'entities/user';
import { GH_PREFIX, parseGithubUsername } from './useGithubHelpers';

type ProfileDraft = {
  name: string;
  bio: string;
};

const DEFAULT_PROFILE: ProfileDraft = { name: 'Пользователь', bio: 'Описание' };
const RESET_TOAST_ID = 'profile-reset-toast';

const normalizeText = (value: string, fallback: string) => {
  const trimmed = (value || '').trim();
  return trimmed || fallback;
};

const extractGithubUsername = (url: string) => {
  const match = (url || '').trim().match(/github\.com\/(?:users\/)?([A-Za-z0-9-_.]+)/i);
  return match?.[1] || '';
};

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
      const url = (githubUrlInput || '').trim();
      if (!url) return;

      const username = extractGithubUsername(url);
      if (!username) return;

      setIsImporting(true);
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();
      const ghName = (data?.name as string) || username;
      const ghBio = (data?.bio as string) || '';
      const ghAvatar = (data?.avatar_url as string) || '';
      updateProfile({
        name: ghName,
        bio: ghBio,
        avatarUrl: ghAvatar,
        githubUrl: url,
        githubUsername: username,
      });

      setGithubUrlInput(url);
      // Если модалка сейчас открыта, обновим draft, чтобы пользователь видел импортированные данные.
      if (isOpen) setDraft({ name: ghName, bio: ghBio });
    } catch {
      // без тоста: по требованию показываем тосты только для reset
    } finally {
      setIsImporting(false);
    }
  }, [githubUrlInput, updateProfile, isOpen]);

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


