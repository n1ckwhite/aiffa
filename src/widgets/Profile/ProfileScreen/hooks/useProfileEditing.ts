import React from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useUserProfile } from 'entities/user';
import { GH_PREFIX, parseGithubUsername } from './useGithubHelpers';

export const useProfileEditing = () => {
  const { profile, updateProfile } = useUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [name, setName] = React.useState(profile.name);
  const [bio, setBio] = React.useState(profile.bio);
  const [githubUrl, setGithubUrl] = React.useState<string>((profile as any).githubUrl || '');
  const [editName, setEditName] = React.useState<string>(profile.name);
  const [editBio, setEditBio] = React.useState<string>(profile.bio);
  const [editGithubUrl, setEditGithubUrl] = React.useState<string>((profile as any).githubUrl || GH_PREFIX);
  const [isImporting, setIsImporting] = React.useState<boolean>(false);

  const onOpenEdit = React.useCallback(() => {
    setEditName(name);
    setEditBio(bio);
    setEditGithubUrl(githubUrl || GH_PREFIX);
    onOpen();
  }, [name, bio, githubUrl, onOpen]);

  const onSaveModal = React.useCallback(() => {
    const nextName = (editName || '').trim() || 'Пользователь';
    const nextBio = (editBio || '').trim() || 'Описание';
    const nextGithub = (editGithubUrl || '').trim();
    setName(nextName);
    setBio(nextBio);
    setGithubUrl(nextGithub);
    updateProfile({ name: nextName, bio: nextBio, githubUrl: nextGithub });
    toast({ title: 'Профиль сохранён', status: 'success', duration: 1800, isClosable: true });
    onClose();
  }, [editName, editBio, editGithubUrl, updateProfile, toast, onClose]);

  const onReset = React.useCallback(() => {
    const nextName = 'Пользователь';
    const nextBio = 'Описание';
    setName(nextName);
    setBio(nextBio);
    setGithubUrl('');
    updateProfile({ name: nextName, bio: nextBio, githubUrl: '', githubUsername: '', avatarUrl: '' });
    toast({ title: 'Имя и описание сброшены', status: 'info', duration: 1800, isClosable: true });
    setEditGithubUrl(GH_PREFIX);
  }, [updateProfile, toast]);

  const importFromGithub = React.useCallback(async () => {
    try {
      const url = (editGithubUrl || '').trim();
      if (!url) {
        toast({ title: 'Введите ссылку на GitHub', status: 'warning', duration: 1800, isClosable: true });
        return;
      }
      const m = url.match(/github\.com\/(?:users\/)?([A-Za-z0-9-_.]+)/i);
      const username = m?.[1];
      if (!username) {
        toast({ title: 'Не удалось определить имя пользователя', status: 'error', duration: 2000, isClosable: true });
        return;
      }
      setIsImporting(true);
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();
      const ghName = (data?.name as string) || username;
      const ghBio = (data?.bio as string) || '';
      const ghAvatar = (data?.avatar_url as string) || '';
      setEditName(ghName);
      setEditBio(ghBio);
      setEditGithubUrl(url);
      updateProfile({ name: ghName, bio: ghBio, avatarUrl: ghAvatar, githubUrl: url, githubUsername: username });
      setName(ghName);
      setBio(ghBio);
      setGithubUrl(url);
      toast({ title: 'Импортировано из GitHub', status: 'success', duration: 1800, isClosable: true });
    } catch {
      toast({ title: 'Не удалось импортировать с GitHub', status: 'error', duration: 2000, isClosable: true });
    } finally {
      setIsImporting(false);
    }
  }, [editGithubUrl, updateProfile, toast]);

  const githubUsername = (profile as any).githubUsername || parseGithubUsername(githubUrl);

  return {
    // disclosure
    isOpen, onOpenEdit, onClose,
    // basic fields
    name, bio, githubUrl,
    setName, setBio, setGithubUrl,
    // edit fields
    editName, editBio, editGithubUrl,
    setEditName, setEditBio, setEditGithubUrl,
    // gh helpers
    GH_PREFIX, githubUsername, isImporting, importFromGithub,
    // actions
    onSaveModal, onReset,
  };
};


